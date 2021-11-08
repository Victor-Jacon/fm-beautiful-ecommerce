# Qual é o paradigma do useQuery?
Ele por si só já é um effect. Não pode colocar dentro de um useEffect.

# Preciso salvar o retorno do useQuery em uma variavel useState?
Não tem necessidade. ELe já retorna com o nome certo do endpoint graphQL.

# Eu estou paginando. Já mostrei alguns itens na primeira página. Na segunda página, qual a origem direta dos dados?
Cada página é uma query nova. Ao clicar no botão de pagina 2, é executa uma função onChange. 
Essa função + a props page={} serve para tornar o componente pagination do tipo "controlled." 
Também na mesma função atualizamos o valor do parâmetro SKIP.
Este parâmetro é usado em nossas consultas pra determinar A PARTIR DE ONDE serão retornados novos dados.
Se eu colocar skip 6 ele vai pular os primeiros 6 registros e começar a me entregar a partir do sétimo.
Eu tenho também o parâmetro first. Este parâmetro determina QUANTOS registros serão retornados.
Se eu quero retornar o registro 0 até o registro 5, eu uso: SKIP = 0 e FIRST = 6
Na segunda página eu quero retornar do registro 6 até o 11. Eu uso: SKIP = 6 e o first se mantem.
O skip também pode ser pensado como o que "já passou".
