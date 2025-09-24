from flask import Flask,render_template,request,jsonify
import os
from check import check_string
import joblib
app=Flask(__name__)
@app.route('/')
def home():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)