const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const axiosRequest = async (filePath) => {
    var newFile = fs.createReadStream(filePath);
    const formData = new FormData();
    formData.append('image', newFile, newFile.name);
    try {
        console.log('TRY');
        console.log('FORMDATA = ', formData);
        // flask API와의 통신인듯.
        var response = await axios
            .create({ headers: formData.getHeaders() })
            .post('http://18.207.197.35:5000/predict', formData);
        // .post('http://172.17.0.1:5000/predict', formData); // docker
        //.post('http://54.180.114.163:5000/predict',formData);          // old AWS EC2
        // .post('htpps://13.209.65.139:5000/predict',formData); // 가장 최신(22.03.24)
        // .post('https://theraphy-flask-heroku2.herokuapp.com/predict', formData);   // Server
        //.post('https://e3kss2gr7l.execute-api.ap-northeast-2.amazonaws.com/dev/lambda_efs', formData); // REST-API GATEWAY-LAMBDA
        //.post('https://3pvwvh59mk.execute-api.ap-northeast-2.amazonaws.com/lambda_efs',formData); // HTP-API GATEWAY-LAMBDA
        return response.data;
    } catch (e) {
        console.log('[ERROR|axiosRequest] ', e);
        return e;
    }
};
module.exports = axiosRequest;
