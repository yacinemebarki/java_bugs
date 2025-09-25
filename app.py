from flask import Flask,render_template,request,jsonify
import os
from check import check_string
import joblib
model_lang=joblib.load('model.pkl')
model=joblib.load('pip1.pkl')
app=Flask(__name__)
@app.route('/')
def home():
    return render_template('index.html')
@app.route('/check',methods=['POST'])
def check():
    data=request.get_json()
    code=data.get('code')
    print(code)
    results=[]
    
    if model_lang.predict([code])!='Java':
        print(model_lang.predict([code]))
        return jsonify({'msg':"you must enter java code",'valid':False,'line_number':None})
    
    info=check_string(code)
    print(info)
    if (info['valid']==False):
        if info['error_line'] is not None:
            results.append(info['error_line'])
            return jsonify( {'msg':"you have missed [] or {} or () or = or you have false type",'valid':False,'line_number':results if results else None} )
        

    results=[]
    lines=code.split("\n")
    i=1
    for line in lines:
        clean_line=line.strip()
        if clean_line:  
            prob=model.predict_proba([clean_line])[:,1]
            pred=(prob>0.56).astype(int)
            if pred==1:
                results.append(i)
        i=i+1
    print(results)    
    if len(results)!=0:
        return jsonify({'msg':"there is bugs in your code",'valid':False,'line_number':results})            
    else :
        return jsonify({'msg':"your code is correct",'valid':True,'line_number':None})
    



if __name__ == "__main__":

    app.run(debug=True)
