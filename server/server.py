import os
import openai
from flask import Flask, request
from flask_cors import cross_origin
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv('API_KEY')

app = Flask(__name__)

@app.route("/")
@cross_origin()

def home():
    return "<h1>Hello Worlds</h><br><a href='/ask'>Ask</a>"

@app.route("/ask")
@cross_origin()

def ask():
    response = openai.Completion.create(
        engine='text-davinci-003',
        prompt=request.args['q'],
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5
    )

    return {"response": response.choices[0].text}

if __name__ == "__main__":
    app.run(debug=True)