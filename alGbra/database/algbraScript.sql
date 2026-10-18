CREATE DATABASE algbra;
-- DROP DATABASE algbra;
USE algbra;

CREATE TABLE usuario(
	id INT AUTO_INCREMENT,
	nome VARCHAR(100) NOT NULL ,
	email VARCHAR(255) NOT NULL UNIQUE,
	senha VARCHAR(255), -- SENHA PODE SER NULA DEVIDO A API DO GOOGLE
		PRIMARY KEY (id)
);

CREATE TABLE formula(
	id INT AUTO_INCREMENT,
	nomePT VARCHAR(100) NOT NULL UNIQUE,
    aliasPT1 VARCHAR(100),
    aliasPT2 VARCHAR(100),
    nomeEN VARCHAR(100) NOT NULL UNIQUE,
    aliasEN1 VARCHAR(100),
    aliasEN2 VARCHAR(100),
	materia VARCHAR(100) NOT NULL,
	conteudo VARCHAR(100) NOT NULL,
	numeroVariaveis INT,
	periodoEnsinado VARCHAR(3) NOT NULL,
	seculo VARCHAR(10) NOT NULL,
	autor VARCHAR(100),
		PRIMARY KEY (id)
);

CREATE TABLE desafioDiario(
	id INT AUTO_INCREMENT,
	formula_id INT NOT NULL,
	dataDesafio DATE NOT NULL UNIQUE,
		PRIMARY KEY (id),
		FOREIGN KEY (formula_id) REFERENCES formula(id)
);

CREATE TABLE participacao(
	usuario_id INT,
	desafioDiario_id INT,
	acertou TINYINT NOT NULL,
		PRIMARY KEY (usuario_id, desafioDiario_id),
		FOREIGN KEY (usuario_id) REFERENCES usuario(id),
		FOREIGN KEY (desafioDiario_id) REFERENCES desafioDiario(id)
);

INSERT INTO formula(nomePT, aliasPT1, aliasPT2, nomeEN, aliasEN1, aliasEN2, materia, conteudo, numeroVariaveis, periodoEnsinado, seculo, autor)


																		-- MATEMÁTICA --


																		-- FUNÇÕES --
	VALUES	('Função Primeiro Grau', '', '', 'First Degree Function', '', '', 'Matemática', 'Funções', 4, '9EF', 'XVII', ''),
    
			('Fórmula Bhaskara', '', '', 'Quadratic Formula', '', '', 'Matemática', 'Funções', 5, '9EF', 'XVII', ''),
			('Coordenada x Vértice', '', '', 'Vertex x Coordinate', '', '', 'Matemática', 'Funções', 3, '1EM', 'XVII', ''),
			
    
																		-- PROGRESSÕES --
			('Progressão Aritmética Termo Geral', 'PA Termo Geral', '', 'Arithmetic Sequence General Term', 'AS General Term', '', 'Matemática', 'Prgressões', 4, '1EM', 'XVII', ''),
			('Progressão Aritmética Razão', 'PA Razão', '', 'Arithmetic Sequence Common Difference', 'AS Common Difference', '', 'Matemática', 'Progressões', 3, '1EM', 'XVII', ''),
			('Progressão Aritmética Soma Termos', 'PA Soma Termos', '', 'Arithmetic Sequence Sum Terms', 'AS Sum Terms', '', 'Matemática', 'Progressões', 4, '1EM', 'XVII', 'Gauss'),
			('Progressão Aritmética Número Termos', 'PA Número Termos', '', 'Arithmetic Sequence Number Terms', 'AS Number Terms', '', 'Matemática', 'Progressões', 4, '1EM', 'XVII', ''),
			
			('Progressão Geométrica Termo Geral', 'PG Termo Geral', '', 'Geometric Sequence General Term', 'AS General Term', '', 'Matemática', 'Prgressões', 4, '1EM', 'XVII', ''),
			('Progressão Geométrica Razão', 'PG Razão', '', 'Geometric Sequence Common Difference', 'AS Common Difference', '', 'Matemática', 'Progressões', 3, '1EM', 'XVII', ''),
			('Progressão Geométrica Soma Termos', 'PG Soma Termos', '', 'Geometric Sequence Sum Terms', 'AS Sum Terms', '', 'Matemática', 'Progressões', 4, '1EM', 'XVII', ''),
			('Progressão Geométrica Número Termos', 'PG Número Termos', '', 'Geometric Sequence Number Terms', 'AS Number Terms', '', 'Matemática', 'Progressões', 4, '1EM', 'XVII', ''),


																		-- GEOMETRIA PLANA --
			('Soma Ângulos Internos', '', '', 'Internal Angles Sum', '', '', 'Matemática', 'Geometria Plana', 2, '7EF', 'III a.C', 'Euclides'),
			('Soma Ângulos Externos', '', '', 'Exterior Angles Sum', '', '', 'Matemática', 'Geometria Plana', 0, '7EF', 'III a.C', 'Euclides'),
			('Número Diagonais', '', '', 'Number Diagonals', '', '', 'Matemática', 'Geometria Plana', 2, '7EF', 'III a.C', 'Euclides'),

			('Área Círculo', '', '', 'Area Circle', '', '', 'Matemática', 'Geometria Plana', 2, '7EF', 'III a.C', 'Arquimedes'),
			('Área Coroa Circular', '', '', 'Area Annulus', '', '', 'Matemática', 'Geometria Plana', 3, '7EF', 'III a.C', 'Arquimedes'),
			('Área Setor Circular', '', '', 'Area Sector', '', '', 'Matemática', 'Geometria Plana', 3, '7EF', 'III a.C', ''),
			('Área Segmento Circular', '', '', 'Area Segment', '', '', 'Matemática', 'Geometria Plana', 3, '7EF', 'III a.C', ''),

			('Área Triângulo', '', '', 'Area Triangle', '', '', 'Matemática', 'Geometria Plana', 3, '7EF', 'III a.C', 'Euclides'),
			('Apótema Triangulo', '', '', 'Apothem Triangle', '', '', 'Matemática', 'Geometria Plana', 2, '7EF', 'III a.C', 'Euclides'),
			('Teorema Pitágoras', '', '', 'Pythagorean Theorem', '', '', 'Matemática', 'Geometria Plana', 3, '7EF', 'VI a.C', 'Pitágoras'),

			('Área Quadrado', '', '', 'Area Square', '', '', 'Matemática', 'Geometria Plana', 2, '7EF', 'III a.C', 'Euclides'),
			('Diagonal Quadrado', '', '', 'Diagonal Square', '', '', 'Matemática', 'Geometria Plana', 2, '7EF', 'III a.C', 'Euclides'),
			('Apótema Quadrado', '', '', 'Apothem Square', '', '', 'Matemática', 'Geometria Plana', 2, '7EF', 'III a.C', 'Euclides'),

			('Área Retângulo', '', '', 'Area Rectangle', '', '', 'Matemática', 'Geometria Plana', 3, '7EF', 'III a.C', 'Euclides'),

			('Área Trapézio', '', '', 'Area Trapezoid', '', '', 'Matemática', 'Geometria Plana', 4, '7EF', 'III a.C', ''),

			('Área Losango', '', '', 'Area Rhombus', '', '', 'Matemática', 'Geometria Plana', 3, '7EF', 'III a.C', 'Euclides'),

			('Área Hexágono', '', '', 'Area Hexagon', '', '', 'Matemática', 'Geometria Plana', 2, '1EM', 'III a.C', 'Euclides'),


																		-- GEOMETRIA ESPACIAL --
			('Prisma Área Total', '', '', 'Prism Total Area', '', '', 'Matemática', 'Geometria Espacial', 3, '9EF', 'III a.C', 'Euclides'),
			('Prisma Volume', '', '', 'Prism Volume', '', '', 'Matemática', 'Geometria Espacial', 3, '9EF', 'III a.C', 'Euclides'),

			('Pirâmide Área Total', '', '', 'Pyramid Total Area', '', '', 'Matemática', 'Geometria Espacial', 3, '9EF', 'III a.C', 'Euclides'),
			('Pirâmide Volume', '', '', 'Pyramid Volume', '', '', 'Matemática', 'Geometria Espacial', 3, '9EF', 'III a.C', 'Euclides'),

			('Cilindro Área Total', '', '', 'Cylinder Total Area', '', '', 'Matemática', 'Geometria Espacial', 3, '9EF', 'III a.C', 'Euclides'),
			('Cilindro Volume', '', '', 'Cylinder Volume', '', '', 'Matemática', 'Geometria Espacial', 3, '9EF', 'III a.C', 'Euclides'),

			('Cone Área Lateral', '', '', 'Cone Lateral Area', '', '', 'Matemática', 'Geometria Espacial', 3, '9EF', 'III a.C', 'Euclides'),
			('Cone Área Total', '', '', 'Cone Total Area', '', '', 'Matemática', 'Geometria Espacial', 3, '9EF', 'III a.C', 'Euclides'),
			('Cone Volume', '', '', 'Cone Volume', '', '', 'Matemática', 'Geometria Espacial', 3, '9EF', 'III a.C', 'Euclides'),

			('Esfera Área Superficie', 'Sphere Área Lateral', '', 'Sphere Superface Area', 'Sphere Lateral Area', '', 'Matemática', 'Geometria Espacial', 2, '9EF', 'III a.C', 'Arquimedes'),
			('Esfera Volume', '', '', 'Sphere Volume', '', '', 'Matemática', 'Geometria Espacial', 2, '9EF', 'III a.C', 'Arquimedes'),


																		-- GEOMETRIA ANALÍTICA --
			('Distância Entre Dois Pontos', '', '', 'Interpoint Distance', 'Distance Between Two Points', '', 'Matemática', 'Geometria Analítica', 5, '1EM', 'XVII', 'René Descartes'),

			('Equação Reta', '', '', 'Line Equation', '', '', 'Matemática', 'Geometria Analítica', 2, '1EM', 'XVII', 'René Descartes'),

			('Equação Circunferência', '', '', 'Circle Equation', '', '', 'Matemática', 'Geometria Analítica', 5, '1EM', 'XVII', 'René Descartes'),


																		-- ANÁLISE COMBINATÓRIA --
			('Permutação Simples', '', '', 'Simple Permutation', '', '', 'Matemática', 'Análise Combinatória', 2, '3EM', 'XVII', ''),

			('Permutação Repetição', '', '', 'Repeated Permutation', '', '', 'Matemática', 'Análise Combinatória', NULL, '3EM', 'XVII', ''), -- O NUMERO DE VARIÁVEIS ESTA NULO POIS TAL NUMERO NESSA FORMULA É INDETERMINADO
			
			('Permutação Circular', '', '', 'Circular Permutation', '', '', 'Matemática', 'Análise Combinatória', 2, '3EM', 'XVII', ''),

			('Arranjo Simples', '', '', 'Simple Arrangement', '', '', 'Matemática', 'Análise Combinatória', 3, '3EM', 'XVII', ''),

			('Combinação Simples', '', '', 'Simple Combination', '', '', 'Matemática', 'Análise Combinatória', 3, '3EM', 'XVII', '');
