from flask import request, jsonify
from database.db_config import get_db_connection

def listar_lancamentos():
    conn = get_db_connection()
    lancamentos = conn.execute('SELECT * FROM lancamentos').fetchall()
    conn.close()

    lancamentos_formatados = [
        {
            'id': lancamento['id'],
            'data': lancamento['data'],
            'tipo': lancamento['tipo'],
            'valor': lancamento['valor'],
            'descricao': lancamento['descricao']
        }
        for lancamento in lancamentos
    ]

    return jsonify({
        'status': 'sucesso',
        'dados': lancamentos_formatados
    }), 200

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