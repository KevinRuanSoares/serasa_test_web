import requests
import random
# Configuração da API
API_URL = "https://brain.agriculture.kevinsoares.com.br/api/producer/"
API_TOKEN = "fb104212a43bd29b4b99052fd6ef762e842b53b5"
HEADERS = {
    "Authorization": f"Token {API_TOKEN}",
    "Content-Type": "application/json",
}

# Função para gerar CPF válido
def generate_cpf():
    def calculate_digit(digits):
        weight = len(digits) + 1
        total = sum(int(d) * (weight - i) for i, d in enumerate(digits))
        remainder = total % 11
        return "0" if remainder < 2 else str(11 - remainder)

    digits = [str(random.randint(0, 9)) for _ in range(9)]
    first_digit = calculate_digit(digits)
    second_digit = calculate_digit(digits + [first_digit])
    return "{}.{}.{}-{}".format(
        "".join(digits[:3]), "".join(digits[3:6]), "".join(digits[6:9]), first_digit + second_digit
    )

# Gerar 30 produtores
producers = [
    {
        "cpf_cnpj": generate_cpf(),
        "name": f"Produtor {i+1}"
    }
    for i in range(1)
]

# Enviar requisições para a API
for producer in producers:
    response = requests.post(API_URL, json=producer, headers=HEADERS)
    if response.status_code == 201:
        print(f"Produtor registrado com sucesso: {producer}")
    else:
        print(f"Erro ao registrar produtor: {producer} - {response.status_code} - {response.text}")