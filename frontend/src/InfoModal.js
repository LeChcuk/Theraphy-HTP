import React, { useState } from 'react';
import styled from 'styled-components';

function InfoModal({ children }) {
    const [visible, setVisible] = useState(true);
    const closeModal = () => {
        setVisible(false);
    };

    return (
        <>
            {visible && (
                <ModalOverlay>
                    <ModalWrapper>
                        <ModalInner className="modal-inner">
                            <div style={{ textAlign: 'center' }}>
                                <h1>
                                    <span>HTP 검사</span>
                                </h1>
                            </div>
                            <ul>
                                <li>
                                    <div>
                                        본 서비스는 <strong>HTP(House-Tree-Person)</strong> 검사를
                                        시행해볼 수 있는 웹 페이지 입니다.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        업로드한 모든 사진은 <strong>딥러닝 모델을 학습</strong>{' '}
                                        하는데 사용될 수 있습니다.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        첨부파일의 최대 용량은 <strong>10MB</strong>로 제한되어
                                        있습니다.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        파일 확장자는 <strong>jpg, png</strong>만 가능합니다.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        기타 문의사항은{' '}
                                        <a href="mailto:inerplat@gmail.com">pjwts9412@gmail.com</a>
                                        으로 문의 바랍니다.
                                    </div>
                                </li>
                            </ul>
                            <button onClick={closeModal}>시작하기</button>
                        </ModalInner>
                    </ModalWrapper>
                </ModalOverlay>
            )}
        </>
    );
}

const ModalWrapper = styled.div`
    box-sizing: border-box;
    display: ${(visible) => (visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1000;
    overflow: auto;
    outline: 0;
`;

const ModalOverlay = styled.div`
    box-sizing: border-box;
    display: ${(visible) => (visible ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 999;
`;

const ModalInner = styled.div`
    box-sizing: border-box;
    position: relative;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
    background-color: #fff;
    border-radius: 10px;
    width: 720px;
    top: 50%;
    transform: translateY(-50%);
    margin: 0 auto;
    padding: 40px 20px;

    button {
        background-color: #da77f2;
        width: 100%;
        border: 0;
        padding: 10px 0;
        margin: 5px 0;
        text-align: center;
        color: #fff;
        font-weight: bold;
        &:hover {
            background-color: #4db6ac;
        }
    }

    ul {
        counter-reset: index;
        padding: 0;
    }
    li {
        counter-increment: index;
        display: flex;
        padding: 12px 0;
        box-sizing: border-box;
    }
    li::before {
        content: counters(index, '.', decimal-leading-zero);
        font-size: 1.5rem;
        text-align: center;
        font-weight: bold;
        min-width: 50px;
        font-variant-numeric: tabular-nums;
        align-self: flex-start;
        background-color: #ff509f;
        background-attachment: fixed;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

export default InfoModal;
