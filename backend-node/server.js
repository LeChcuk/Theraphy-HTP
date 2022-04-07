const express = require('express');
const app = express();
const md5File = require('md5-file');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const hpp = require('hpp');
const axiosRequest = require('./module/axiosRequest.js');
const multerOption = require('./module/multerOption.js');
const port = process.env.PORT || 3001;

app.use(cors());

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined')); // combined 모드는 더 많은 사용자 정보를 남기기 때문에 버그 해결에 유용
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(hpp());
} else {
    app.use(morgan('dev'));
}

app.post('/node', multerOption.single('image'), async (request, response) => {
    try {
        console.log(request.file);
        const fileName = request.file['filename'];
        const hash = md5File.sync('userUpload/' + fileName);
        console.log('FILE NAME = ', fileName);

        const axiosResponse = await axiosRequest('userUpload/' + fileName);

        if (axiosResponse['success'] === true) {
            console.log('axiosRequest SUCCESS');
            let imageInfo = [];
            for (let i = 0; i < axiosResponse.label.length; i++) {
                if (i == 0) {
                    imageInfo[i] = [
                        {
                            success: true,
                            hash: hash,
                            coordinate: {
                                x: axiosResponse['x1'][i],
                                y: axiosResponse['y1'][i],
                                width: axiosResponse['x2'][i] - axiosResponse['x1'][i],
                                height: axiosResponse['y2'][i] - axiosResponse['y1'][i],
                            },
                            label: axiosResponse['label'][i],
                            score: axiosResponse['score'][i],
                            path: fileName,
                            voteChaewon: 0,
                            voteYuri: 0,
                            voteYena: 0,
                            request: 1,
                            house: axiosResponse['house'],
                        },
                    ];
                } else {
                    imageInfo[i] = [
                        {
                            coordinate: {
                                x: axiosResponse['x1'][i],
                                y: axiosResponse['y1'][i],
                                width: axiosResponse['x2'][i] - axiosResponse['x1'][i],
                                height: axiosResponse['y2'][i] - axiosResponse['y1'][i],
                            },
                            label: axiosResponse['label'][i],
                            score: axiosResponse['score'][i],
                        },
                    ];
                }
            }
            response.json(imageInfo);
        } else {
            response.json({
                success: false,
                path: fileName,
                hash: hash,
            });
        }
    } catch (e) {
        console.log('[ERROR|axiosResponse] : ', e);
    }
});

app.listen(port, () => console.log(`listening on port ${port}!`));
