FROM python:3.6.12

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

# COPY keras-retinanet .

# COPY house3-1.h5 .

# COPY Inference_model.py .

WORKDIR /app/keras-retinanet

RUN python setup.py install

RUN python setup.py build_ext --inplace

WORKDIR /app

# container 실행 시 발생하는 libGL.so.1: cannot open shared object file: No such file or directory 에러에 대한 대처
RUN apt-get update

RUN apt-get -y install libgl1-mesa-glx

RUN apt-get -y install nginx

ENTRYPOINT python Inference_model.py

# ENTRYPOINT gunicorn Inference_model:app -b 0.0.0.0:5000 --timeout=10

EXPOSE 5000

# POST /predict
# port :5000
