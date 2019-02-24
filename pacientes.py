from datetime import datetime
from flask import jsonify, make_response, abort

def get_timestamp():
    return datetime.now().strftime(("%Y-%m-%d %H:%M:%S"))

PEOPLE = {
    "45690087645": {
        "nome": "Maria Chagas",
        "cpf": "45690087645",
        "rg": "39448987",
        "dtnascto": "01/10/1950",
        "email": "maria.chagas@gmail.com",
        "cep": "01125001",
        "endereco": "R. Augusta, 1000, apto 187",
        "bairro": "Consolacao",
        "cidade": "S Paulo",
        "estado": "SP",
        "convenio": "Unimed",
        "dataatualizacao": get_timestamp(),
    },
    "20200081234": {
        "nome": "Hipo Condriaco",
        "cpf": "20200081234",
        "rg": "12348975",
        "dtnascto": "01/03/1979",
        "email": "hipo123@hotmail.com",
        "cep": "04567001",
        "endereco": "R. XV de Novembro, 10",
        "bairro": "Centro",
        "cidade": "S Paulo",
        "estado": "SP",
        "convenio": "Bradesco",
        "dataatualizacao": get_timestamp(),
    },
    "78990087980": {
        "nome": "Jose dos Santos",
        "cpf": "78990087980",
        "rg": "90008983",
        "dtnascto": "20/06/1992",
        "email": "jos.santos@gmail.com",
        "cep": "03031001",
        "endereco": "Al. Santos, 151, apto 12",
        "bairro": "Jardins",
        "cidade": "S Paulo",
        "estado": "SP",
        "convenio": "Sulamerica",
        "dataatualizacao": get_timestamp(),
    },
}

def read_all():
    dict_pacientes = [PEOPLE[key] for key in sorted(PEOPLE.keys())]
    pacientes = jsonify(dict_pacientes)
    qtd = len(dict_pacientes)
    content_range = "pacientes 0-"+str(qtd)+"/"+str(qtd)
    # Configura headers
    pacientes.headers['Access-Control-Allow-Origin'] = '*'
    pacientes.headers['Access-Control-Expose-Headers'] = 'Content-Range'
    pacientes.headers['Content-Range'] = content_range
    return pacientes

def read_one(cpf):
    if cpf in PEOPLE:
        person = PEOPLE.get(cpf)
    else:
        abort(
            404, "Person with last name {cpf} not found".format(cpf=cpf)
        )
    return person


def create(person):
    cpf = person.get("cpf", None)
    nome = person.get("nome", None)
    rg = person.get("rg", None)
    dtnascto = person.get("dtnascto", None)
    email = person.get("email", None)
    cep = person.get("cep", None)
    endereco = person.get("endereco", None)
    bairro = person.get("bairro", None)
    cidade = person.get("cidade", None)
    estado = person.get("estado", None)
    convenio = person.get("convenio", None)


    if cpf not in PEOPLE and cpf is not None:
        PEOPLE[cpf] = {
            "cpf": cpf,
            "nome": nome,
            "rg": rg,
            "dtnascto": dtnascto,
            "email": email,
            "cep": cep,
            "endereco": endereco,
            "bairro": bairro,
            "cidade": cidade,
            "estado": estado,
            "convenio": convenio,
            "dataatualizacao": get_timestamp(),
        }
        return make_response(
            "{cpf} successfully created".format(cpf=cpf), 201
        )
    else:
        abort(
            406,
            "Person with last name {cpf} already exists".format(cpf=cpf),
        )


def update(cpf, person):
    if cpf in PEOPLE:
        PEOPLE[cpf]["nome"] = person.get("nome")
        PEOPLE[cpf]["rg"] = person.get("rg")
        PEOPLE[cpf]["dtnascto"] = person.get("dtnascto")
        PEOPLE[cpf]["email"] = person.get("email")
        PEOPLE[cpf]["cep"] = person.get("cep")
        PEOPLE[cpf]["endereco"] = person.get("endereco")
        PEOPLE[cpf]["bairro"] = person.get("bairro")
        PEOPLE[cpf]["cidade"] = person.get("cidade")
        PEOPLE[cpf]["estado"] = person.get("estado")
        PEOPLE[cpf]["convenio"] = person.get("convenio")
        PEOPLE[cpf]["dataatualizacao"] = get_timestamp()

        return PEOPLE[cpf]
    else:
        abort(
            404, "Person with cpf {cpf} not found".format(cpf=cpf)
        )

def delete(cpf):
    if cpf in PEOPLE:
        del PEOPLE[cpf]
        return make_response(
            "{cpf} successfully deleted".format(cpf=cpf), 200
        )
    else:
        abort(
            404, "Person with cpf {cpf} not found".format(cpf=cpf)
        )




