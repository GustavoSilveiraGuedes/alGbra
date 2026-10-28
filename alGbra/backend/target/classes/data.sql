-- 1. MATÉRIAS --
INSERT IGNORE INTO materia (nome) VALUES
('Matemática'),
('<3');

-- 2. CONTEÚDOS --
INSERT IGNORE INTO conteudo (nome, materia_id) VALUES
('Funções', (SELECT id FROM materia WHERE nome = 'Matemática')),
('Progressões', (SELECT id FROM materia WHERE nome = 'Matemática')),
('Geometria Plana', (SELECT id FROM materia WHERE nome = 'Matemática')),
('Geometria Espacial', (SELECT id FROM materia WHERE nome = 'Matemática')),
('Geometria Analítica', (SELECT id FROM materia WHERE nome = 'Matemática')),
('Análise Combinatória', (SELECT id FROM materia WHERE nome = 'Matemática')),
('Você', (SELECT id FROM materia WHERE nome = '<3')),
('Matemática Financeira', (SELECT id FROM materia WHERE nome = 'Matemática'));

-- 3. FÓRMULAS --
INSERT IGNORE INTO formula(nome_pt, alias_pt1, alias_pt2, nome_en, alias_en1, alias_en2, conteudo_id, numero_variaveis, periodo_ensinado, seculo, autor, imagem_url) VALUES

-- FUNÇÕES --
('Função Primeiro Grau', '', '', 'First Degree Function', '', '', (SELECT id FROM conteudo WHERE nome = 'Funções'), 4, '9EF', 'XVII', '', '/formulas/funcoes/funcao_primeiro_grau.jpg'),
('Fórmula Bhaskara', '', '', 'Quadratic Formula', '', '', (SELECT id FROM conteudo WHERE nome = 'Funções'), 5, '9EF', 'XVII', '', '/formulas/funcoes/formula_bhaskara.jpg'),
('Coordenada x Vértice', '', '', 'Vertex x Coordinate', '', '', (SELECT id FROM conteudo WHERE nome = 'Funções'), 3, '1EM', 'XVII', '', '/formulas/funcoes/coordenada_x_vertice.jpg'),

-- PROGRESSÕES --
('Progressão Aritmética Termo Geral', 'PA Termo Geral', '', 'Arithmetic Sequence General Term', 'AS General Term', '', (SELECT id FROM conteudo WHERE nome = 'Progressões'), 4, '1EM', 'XVII', '', '/formulas/progressoes/progressao_aritmetica_termo_geral.jpg'),
('Progressão Aritmética Razão', 'PA Razão', '', 'Arithmetic Sequence Common Difference', 'AS Common Difference', '', (SELECT id FROM conteudo WHERE nome = 'Progressões'), 3, '1EM', 'XVII', '', '/formulas/progressoes/progressao_aritmetica_razao.jpg'),
('Progressão Aritmética Soma Termos', 'PA Soma Termos', '', 'Arithmetic Sequence Sum Terms', 'AS Sum Terms', '', (SELECT id FROM conteudo WHERE nome = 'Progressões'), 4, '1EM', 'XVII', 'Gauss', '/formulas/progressoes/progressao_aritmetica_soma_termos.jpg'),
('Progressão Aritmética Número Termos', 'PA Número Termos', '', 'Arithmetic Sequence Number Terms', 'AS Number Terms', '', (SELECT id FROM conteudo WHERE nome = 'Progressões'), 4, '1EM', 'XVII', '', '/formulas/progressoes/progressao_aritmetica_numero_termos.jpg'),

('Progressão Geométrica Termo Geral', 'PG Termo Geral', '', 'Geometric Sequence General Term', 'AS General Term', '', (SELECT id FROM conteudo WHERE nome = 'Progressões'), 4, '1EM', 'XVII', '', '/formulas/progressoes/progressao_geometrica_termo_geral.jpg'),
('Progressão Geométrica Razão', 'PG Razão', '', 'Geometric Sequence Common Difference', 'AS Common Difference', '', (SELECT id FROM conteudo WHERE nome = 'Progressões'), 3, '1EM', 'XVII', '', '/formulas/progressoes/progressao_geometrica_razao.jpg'),
('Progressão Geométrica Soma Termos', 'PG Soma Termos', '', 'Geometric Sequence Sum Terms', 'AS Sum Terms', '', (SELECT id FROM conteudo WHERE nome = 'Progressões'), 4, '1EM', 'XVII', '', '/formulas/progressoes/progressao_geometrica_soma_termos.jpg'),
('Progressão Geométrica Número Termos', 'PG Número Termos', '', 'Geometric Sequence Number Terms', 'AS Number Terms', '', (SELECT id FROM conteudo WHERE nome = 'Progressões'), 4, '1EM', 'XVII', '', '/formulas/progressoes/progressao_geometrica_numero_termos.jpg'),

-- GEOMETRIA PLANA --
('Soma Ângulos Internos', '', '', 'Internal Angles Sum', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 2, '7EF', 'III a.C', 'Euclides', '/formulas/geometria_plana/soma_angulos_internos.jpg'),
('Soma Ângulos Externos', '', '', 'Exterior Angles Sum', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 0, '7EF', 'III a.C', 'Euclides', '/formulas/geometria_plana/soma_angulos_externos.jpg'),
('Número Diagonais', '', '', 'Number Diagonals', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 2, '7EF', 'III a.C', 'Euclides', '/formulas/geometria_plana/numero_diagonais.jpg'),

('Área Círculo', '', '', 'Area Circle', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 2, '7EF', 'III a.C', 'Arquimedes', '/formulas/geometria_plana/area_circulo.jpg'),
('Área Coroa Circular', '', '', 'Area Annulus', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 3, '7EF', 'III a.C', 'Arquimedes', '/formulas/geometria_plana/area_coroa_circular.jpg'),
('Área Setor Circular', '', '', 'Area Sector', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 3, '7EF', 'III a.C', '', '/formulas/geometria_plana/area_setor_circular.jpg'),
('Área Segmento Circular', '', '', 'Area Segment', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 3, '7EF', 'III a.C', '', '/formulas/geometria_plana/area_segmento_circular.jpg'),

('Área Triângulo', '', '', 'Area Triangle', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 3, '7EF', 'III a.C', 'Euclides', '/formulas/geometria_plana/area_triangulo.jpg'),
('Apótema Triangulo', '', '', 'Apothem Triangle', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 2, '7EF', 'III a.C', 'Euclides', '/formulas/geometria_plana/apotema_triangulo.jpg'),
('Teorema Pitágoras', '', '', 'Pythagorean Theorem', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 3, '7EF', 'VI a.C', 'Pitágoras', '/formulas/geometria_plana/teorema_pitagoras.jpg'),

('Área Quadrado', '', '', 'Area Square', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 2, '7EF', 'III a.C', 'Euclides', '/formulas/geometria_plana/area_quadrado.jpg'),
('Diagonal Quadrado', '', '', 'Diagonal Square', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 2, '7EF', 'III a.C', 'Euclides', '/formulas/geometria_plana/diagonal_quadrado.jpg'),
('Apótema Quadrado', '', '', 'Apothem Square', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 2, '7EF', 'III a.C', 'Euclides', '/formulas/geometria_plana/apotema_quadrado.jpg'),

('Área Retângulo', '', '', 'Area Rectangle', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 3, '7EF', 'III a.C', 'Euclides', '/formulas/geometria_plana/area_retangulo.jpg'),
('Área Trapézio', '', '', 'Area Trapezoid', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 4, '7EF', 'III a.C', '', '/formulas/geometria_plana/area_trapezio.jpg'),
('Área Losango', '', '', 'Area Rhombus', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 3, '7EF', 'III a.C', 'Euclides', '/formulas/geometria_plana/area_losango.jpg'),
('Área Hexágono', '', '', 'Area Hexagon', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Plana'), 2, '1EM', 'III a.C', 'Euclides', '/formulas/geometria_plana/area_hexagono.jpg'),

-- GEOMETRIA ESPACIAL --
('Prisma Volume', '', '', 'Prism Volume', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Espacial'), 3, '9EF', 'III a.C', 'Euclides', '/formulas/geometria_espacial/prisma_volume.jpg'),
('Pirâmide Volume', '', '', 'Pyramid Volume', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Espacial'), 3, '9EF', 'III a.C', 'Euclides', '/formulas/geometria_espacial/piramide_volume.jpg'),
('Cilindro Volume', '', '', 'Cylinder Volume', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Espacial'), 3, '9EF', 'III a.C', 'Euclides', '/formulas/geometria_espacial/cilindro_volume.jpg'),

('Cone Área Lateral', '', '', 'Cone Lateral Area', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Espacial'), 3, '9EF', 'III a.C', 'Euclides', '/formulas/geometria_espacial/cone_area_lateral.jpg'),
('Cone Área Total', '', '', 'Cone Total Area', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Espacial'), 3, '9EF', 'III a.C', 'Euclides', '/formulas/geometria_espacial/cone_area_total.jpg'),
('Cone Volume', '', '', 'Cone Volume', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Espacial'), 3, '9EF', 'III a.C', 'Euclides', '/formulas/geometria_espacial/cone_volume.jpg'),

('Esfera Área Superficie', 'Esfera Área Lateral', '', 'Sphere Superface Area', 'Sphere Lateral Area', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Espacial'), 2, '9EF', 'III a.C', 'Arquimedes', '/formulas/geometria_espacial/esfera_area_superficie.jpg'),
('Esfera Volume', '', '', 'Sphere Volume', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Espacial'), 2, '9EF', 'III a.C', 'Arquimedes', '/formulas/geometria_espacial/esfera_volume.jpg'),

-- GEOMETRIA ANALÍTICA --
('Distância Entre Dois Pontos', '', '', 'Interpoint Distance', 'Distance Between Two Points', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Analítica'), 5, '1EM', 'XVII', 'René Descartes', '/formulas/geometria_analitica/distancia_entre_dois_pontos.jpg'),
('Equação Reta', '', '', 'Line Equation', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Analítica'), 2, '1EM', 'XVII', 'René Descartes', '/formulas/geometria_analitica/equacao_reta.jpg'),
('Equação Circunferência', '', '', 'Circle Equation', '', '', (SELECT id FROM conteudo WHERE nome = 'Geometria Analítica'), 5, '1EM', 'XVII', 'René Descartes', '/formulas/geometria_analitica/equacao_circunferencia.jpg'),

-- ANÁLISE COMBINATÓRIA --
('Permutação Simples', '', '', 'Simple Permutation', '', '', (SELECT id FROM conteudo WHERE nome = 'Análise Combinatória'), 2, '3EM', 'XVII', '', '/formulas/analise_combinatoria/permutacao_simples.jpg'),
('Permutação Repetição', '', '', 'Repeated Permutation', '', '', (SELECT id FROM conteudo WHERE nome = 'Análise Combinatória'), NULL, '3EM', 'XVII', '', '/formulas/analise_combinatoria/permutacao_repeticao.jpg'),
('Permutação Circular', '', '', 'Circular Permutation', '', '', (SELECT id FROM conteudo WHERE nome = 'Análise Combinatória'), 2, '3EM', 'XVII', '', '/formulas/analise_combinatoria/permutacao_circular.jpg'),
('Arranjo Simples', '', '', 'Simple Arrangement', '', '', (SELECT id FROM conteudo WHERE nome = 'Análise Combinatória'), 3, '3EM', 'XVII', '', '/formulas/analise_combinatoria/arranjo_simples.jpg'),
('Combinação Simples', '', '', 'Simple Combination', '', '', (SELECT id FROM conteudo WHERE nome = 'Análise Combinatória'), 3, '3EM', 'XVII', '', '/formulas/analise_combinatoria/combinacao_simples.jpg'),

-- MATEMÁTICA FINANCEIRA --
('Juros Simples', '', '', 'Simple Interest', '', '', (SELECT id FROM conteudo WHERE nome = 'Matemática Financeira'), 4, '2EM', 'XVII', '', '/formulas/matematica_financeira/juros_simples.jpg'),
('Juros Compostos', '', '', 'Compound Interest', '', '', (SELECT id FROM conteudo WHERE nome = 'Matemática Financeira'), 4, '2EM', 'XVII', '', '/formulas/matematica_financeira/juros_compostos.jpg');