from flask import request, jsonify
from database.db_config import get_db_connection

def listar_lancamentos():
    conn = get_db_connection()
    lancamentos = conn.execute('SELECT * FROM lancamentos').fetchall()
    conn.close()

    lancamentos_list = []
    for lanc in lancamentos:
        lancamentos_list.append({
            'id': lanc['id'],
            'data': lanc['data'],
            'tipo': lanc['tipo'],
            'valor': lanc['valor'],
            'descricao': lanc['descricao']
        })
    return jsonify(lancamentos_list)

def criar_lancamento():
    dados = request.get_json()
    conn = get_db_connection()
    conn.execute(
        'INSERT INTO lancamentos (data, tipo, valor, descricao) VALUES (?, ?, ?, ?)',
        (dados['data'], dados['tipo'], dados['valor'], dados['descricao'])
    )
    conn.commit()
    conn.close()

    return jsonify({'mensagem': 'Lançamento criado com sucesso!'}), 201