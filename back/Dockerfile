# 
FROM python:3.11

#
ENV PYTHONPATH=/code/app

# 
WORKDIR /code/app

# 
COPY ./requirements.txt /code/requirements.txt

# 
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

#
RUN pip install -q -U google-generativeai

# 
COPY ./app /code/app

# 
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]