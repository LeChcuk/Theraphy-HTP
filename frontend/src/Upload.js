import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from './Table';
import { css } from '@emotion/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import { IconButton } from '@material-ui/core';
import AnimatedModal from './userTrain';
import Dropzone from 'react-dropzone';
import Banner from 'react-js-banner';
import PropagateLoader from 'react-spinners/PropagateLoader';
import './Upload.scss';
import InfoModal from './InfoModal';

const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`;

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function Upload() {
    const [state, SetState] = useState({
        error: false,
        fail: false,
        predictions: '',
        loading: false,
        fileName: '',
        hash: '',
        vote: [],
        showResult: false,
        bannerStatus: false,
        reload: false,
    });

    const clear = () => {
        SetState({
            ...state,
            error: false,
            fail: false,
            predictions: '',
            loading: false,
            fileName: '',
            hash: '',
            vote: [],
            showResult: false,
            bannerStatus: false,
            reload: true,
            house: undefined,
        });
    };

    const showBanner = (status) => {
        SetState(status);
        setTimeout(function () {
            SetState({ bannerStatus: false, error: false, fail: false });
        }, 3000);
    };

    const readFileAsync = (inputFile) => {
        const reader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException('Problem parsing input file.'));
            };

            reader.onload = () => {
                const output = document.getElementById('preview');
                output.src = reader.result;
                console.log('%conLoad.output = ', 'color:green', output);
                console.log(document.getElementById('imageCanvas'));
                resolve(reader.result);
            };
            reader.readAsDataURL(inputFile[0]);
        });
    };

    const onDrop = async (event) => {
        console.log('UPLOAD.js -> onDrop -> event = ', event);
        SetState({
            ...state,
            predictions: '',
            loading: true,
            fileName: '',
            hash: '',
            vote: [],
            showResult: false,
        });
        const pictureFiles = event;
        const content = await readFileAsync(pictureFiles);
        const canvas = document.getElementById('imageCanvas');
        const ctx = canvas.getContext('2d');

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (pictureFiles.length > 0) {
            const formData = new FormData();
            formData.append('image', pictureFiles[0], pictureFiles[0].name);
            console.log('FORMDATA === ', formData);

            const start = new Date().getTime();
            let imagePost = async () => {
                try {
                    console.log('ASYNC');
                    console.log(formData);
                    // return await axios.post('http://localhost:3001/', formData);
                    return await axios.post('http://18.207.197.35/:3001/', formData);
                } catch (error) {
                    console.log(error);
                }
            };
            let response = await imagePost();

            const elapsed = new Date().getTime() - start;
            console.log('%c소요된 시간 == ', 'color:green', elapsed);
            console.log('AWAIT');
            console.log('response = ', response);
            console.log('response.data = ', response.data);
            if (!response) {
                console.log('IN1');
                showBanner({ error: true });
            } else {
                const img = document.getElementById('preview');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
                if (response.data.success !== false) {
                    if (response.data[0][0].success === true) {
                        for (let i = 0; i < response.data.length; i++) {
                            console.log(response.data[i][0]);
                            let caption = ((text) => {
                                return {
                                    house: '집',
                                    window: '창문',
                                    door: '현관문',
                                    roof: '지붕',
                                    'triangle roof': '뾰족한 지붕',
                                    fense: '울타리',
                                    'smoking chimney': '연기나는 굴뚝',
                                    tree: '나무',
                                    'veiled window': '가려진 창문',
                                    mountain: '산',
                                    'ground line': '지면선',
                                    'patterned roof': '무늬지붕',
                                    'side door house': '측면에 문 달린 집',
                                    'poor wall': '허술한 벽',
                                    'solid wall': '견고한 벽',
                                    'half sun': '반만 나온 태양',
                                    '2nd floor window house': '2층에만 창문이 있는 집',
                                }[text];
                            })(response.data[i][0].label);
                            const { x, y, width, height } = response.data[i][0].coordinate;
                            let color = getRandomColor();
                            console.log(response.data[0][0].house);

                            ctx.beginPath();
                            ctx.lineWidth = '3';
                            ctx.font = 'bold 40px sans-serif';
                            ctx.fillStyle = color;
                            ctx.strokeStyle = color;
                            ctx.fillText(
                                caption + ' ' + response.data[i][0].score.toFixed(3),
                                x,
                                y + 40
                            );
                            ctx.rect(x, y, width, height);
                            ctx.stroke();

                            if (i === 0) {
                                SetState({
                                    ...state,
                                    predictions: caption,
                                    loading: false,
                                    fileName: response.data[0][0].path,
                                    hash: response.data[0][0].hash,
                                    vote: [
                                        response.data[0].voteChaewon,
                                        response.data[0].voteYuri,
                                        response.data[0].voteYena,
                                    ],
                                    showResult: true,
                                    house: response.data[0][0].house,
                                });
                            } else {
                                SetState({
                                    ...state,
                                    predictions: caption,
                                    loading: false,
                                    showResult: true,
                                    house: response.data[0][0].house,
                                });
                            }
                            console.log('%cSTATE(ONDROP) == ', 'color:blue', state);
                        }
                    }
                } else {
                    console.log('IN2');
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    SetState({
                        ...state,
                        predictions: 'fail to find',
                        loading: false,
                        fileName: response.data.path,
                        hash: response.data.hash,
                    });
                    showBanner({ fail: true });
                }
            }
        }
    };

    useEffect(() => {
        const paste = (event) => {
            clear();
            const items = (event.clipboardData || event.originalEvent.clipboardData).items;
            console.log(JSON.stringify(items));
            var blob = null;
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf('image') === 0) {
                    blob = items[i].getAsFile();
                }
            }
            if (blob !== null) {
                console.log(blob);
                onDrop([blob]);
            }
        };
        window.addEventListener('paste', paste);
    });

    return (
        <div className="back">
            <Banner
                className="banner"
                title="응답이 제출되었습니다."
                showBanner={state.bannerStatus}
            />
            <Banner
                css={{ backgroundColor: 'red', color: 'white' }}
                className="banner"
                title="잘못된 파일이거나, 서버가 응답할 수 없습니다."
                showBanner={state.error}
            />
            <Banner
                css={{ backgroundColor: 'yellow' }}
                className="banner"
                title="집 그림 분석에 실패했습니다."
                showBanner={state.fail}
            />
            <div className="bodyDiv">
                <InfoModal></InfoModal>
                <img className="preview" id="preview" alt="프리뷰" />
                <div className="upload">
                    <IconButton className="iconButton" onClick={clear} size="small">
                        <RefreshIcon className="refresh" fontSize="large" />
                    </IconButton>
                    <div className="upload-files">
                        <header>
                            <p>
                                <span className="up">HTP</span>
                                <span className="load">검사</span>
                            </p>
                        </header>
                        <div className="body">
                            {!state.loading && !state.showResult ? (
                                <div className="uploadBox">
                                    <Dropzone
                                        multiple={false}
                                        onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <section className="dropSection">
                                                <div className="dropBox" {...getRootProps()}>
                                                    <input
                                                        className="dropzone"
                                                        {...getInputProps({
                                                            type: 'file',
                                                            accept: 'image/*',
                                                        })}
                                                    />
                                                    <div className="dropText">
                                                        <p
                                                            className={
                                                                state.reload ? 'nomalP' : 'fadeP'
                                                            }
                                                        >
                                                            업로드할 파일을 드래그하거나
                                                        </p>
                                                        <p
                                                            className={
                                                                state.reload ? 'nomalP' : 'fadeP'
                                                            }
                                                        >
                                                            박스를{' '}
                                                            <span style={{ color: 'lightBlue' }}>
                                                                {' '}
                                                                클릭
                                                            </span>
                                                            해주세요
                                                        </p>
                                                        <br />
                                                        <p
                                                            className={
                                                                state.reload ? 'nomalP' : 'fadeP'
                                                            }
                                                        >
                                                            <span style={{ color: 'lightBlue' }}>
                                                                Ctrl+V
                                                            </span>
                                                            로 클립보드에 있는 이미지를
                                                        </p>
                                                        <p
                                                            className={
                                                                state.reload ? 'nomalP' : 'fadeP'
                                                            }
                                                        >
                                                            붙여 넣을 수 있습니다.
                                                        </p>
                                                    </div>
                                                </div>
                                            </section>
                                        )}
                                    </Dropzone>
                                </div>
                            ) : (
                                <div className="imageBox">
                                    <div className="imageTable">
                                        <canvas className="imageCanvas" id="imageCanvas">
                                            이 브라우저는 'canvas'기능을 제공하지 않습니다.
                                        </canvas>
                                        {state.showResult ? <></> : null}

                                        <div className="loadingBox">
                                            <PropagateLoader
                                                css={override}
                                                size={25}
                                                color={'#FF509F'}
                                                loading={state.loading}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {!state.loading && !state.showResult && !state.house ? null : (
                    <Table house={state.house}></Table>
                )}
            </div>
        </div>
    );
}

export default Upload;
