from flask import Flask, request, render_template

from contextlib import redirect_stdout
import io
import ast

app = Flask(__name__)

def evaluate_code(code):
    f = io.StringIO()
    with redirect_stdout(f):
        try:
            bod = ast.parse(code).body
            for n in bod:
                if type(n) == ast.Expr:
                    result = eval(compile(ast.Expression(n.value), "<string>", "eval"), globals())
                    if result:
                        print(result)
                else:
                    exec(compile(ast.Module(body=[n], type_ignores=[]), "<string>", "exec"), globals())
        except Exception as e:
            print('There is a ' + e.__class__.__name__ +  '!')
            print(e)


    return f.getvalue()

@app.route('/',methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/evaluate', methods=['POST'])
def evaluate():
    data = request.json
    code = data['command']
    return {'result': evaluate_code(code)}

if __name__== '__main__':
    app.run(port=8080, debug = True)