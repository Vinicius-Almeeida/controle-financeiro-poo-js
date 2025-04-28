from flask import Flask, request, jsonify
from flask_cors import CORS
from controllers.lancamentos_controllers import listar_lancamentos, criar_lancamento

app = Flask(__name__)
CORS(app)

# Rota para listar lançamentos
@app.route('/lancamentos', methods=['GET'])
def rota_listar_lancamentos():
    return listar_lancamentos()

# Rota para criar um novo lançamento
@app.route('/lancamentos', methods=['POST'])
def rota_criar_lancamento():
    return criar_lancamento()

if __name__ == '__main__':
    app.run(debug=True)
