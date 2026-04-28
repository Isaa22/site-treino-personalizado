// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const workoutPlanDiv = document.getElementById('workoutPlan');
    const formContainer = document.getElementById('form-container');

    // Handle form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get user data
        const userData = {
            nome: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            idade: parseInt(document.getElementById('idade').value),
            genero: document.getElementById('genero').value,
            objetivo: document.getElementById('objetivo').value,
            nivel: document.getElementById('nivel').value
        };

        // Generate workout plan
        const workoutPlan = generateWorkoutPlan(userData);
        
        // Display workout plan
        displayWorkoutPlan(workoutPlan, userData);
        
        // Hide form and show workout plan
        formContainer.style.display = 'none';
        workoutPlanDiv.style.display = 'block';
        
        // Scroll to workout plan
        workoutPlanDiv.scrollIntoView({ behavior: 'smooth' });
    });

    // Download PDF functionality
    document.getElementById('downloadBtn')?.addEventListener('click', () => {
        downloadAsPDF();
    });
});

// Generate workout plan based on user data
function generateWorkoutPlan(userData) {
    const { objetivo, nivel, idade, genero } = userData;
    
    // Adjust sets/reps based on level (mas mantendo cardio todos os dias)
    const getSetsReps = () => {
        const levels = {
            iniciante: { series: 3, repeticoes: '10-12', descanso: '60s', cardioMin: '15-20min' },
            intermediario: { series: 4, repeticoes: '8-10', descanso: '90s', cardioMin: '20-25min' },
            avancado: { series: 5, repeticoes: '6-8', descanso: '120s', cardioMin: '25-30min' }
        };
        return levels[nivel] || levels.iniciante;
    };

    const intensity = getSetsReps();

    // Cardio options for each day (diferentes estímulos)
    const cardioOptions = {
        segunda: [
            { nome: 'Esteira Inclinada', tempo: intensity.cardioMin, intensidade: 'Moderado' },
            { nome: 'Bicicleta Ergométrica', tempo: intensity.cardioMin, intensidade: 'Moderado' },
            { nome: 'Elíptico', tempo: intensity.cardioMin, intensidade: 'Moderado' }
        ],
        terca: [
            { nome: 'HIIT na Esteira', tempo: '15min', intensidade: 'Alta (30s tiro/30s descanso)' },
            { nome: 'Pular Corda', tempo: '15min', intensidade: 'Alta' },
            { nome: 'Spinning', tempo: '20min', intensidade: 'Alta' }
        ],
        quarta: [
            { nome: 'Caminhada Rápida', tempo: intensity.cardioMin, intensidade: 'Leve a Moderado' },
            { nome: 'Remo', tempo: intensity.cardioMin, intensidade: 'Moderado' },
            { nome: 'Transporte', tempo: intensity.cardioMin, intensidade: 'Moderado' }
        ],
        quinta: [
            { nome: 'Corrida Contínua', tempo: '20-25min', intensidade: 'Moderado/Alta' },
            { nome: 'Bicicleta', tempo: '25min', intensidade: 'Moderado/Alta' },
            { nome: 'Circuito Aeróbico', tempo: '20min', intensidade: 'Alta' }
        ],
        sexta: [
            { nome: 'Esteira (Leve)', tempo: intensity.cardioMin, intensidade: 'Leve (recuperação)' },
            { nome: 'Caminhada', tempo: intensity.cardioMin, intensidade: 'Leve' },
            { nome: 'Elíptico Leve', tempo: intensity.cardioMin, intensidade: 'Leve' }
        ],
        sabado: [
            { nome: 'HIIT Avançado', tempo: '20min', intensidade: 'Muito Alta' },
            { nome: 'Pular Corda + Burpees', tempo: '15min', intensidade: 'Muito Alta' },
            { nome: 'Corrida na Praia/Pista', tempo: '25min', intensidade: 'Alta' }
        ],
        domingo: [
            { nome: 'Caminhada Ativa', tempo: '30min', intensidade: 'Leve (recuperação ativa)' },
            { nome: 'Alongamento Cardio', tempo: '20min', intensidade: 'Muito Leve' },
            { nome: 'Yoga Flow', tempo: '20min', intensidade: 'Leve' }
        ]
    };

    // ========== ESTRUTURA DE TREINO PERSONALIZADA ==========
    // Divisão exata como você pediu:
    // Segunda: Posterior
    // Terça: Costa e Bíceps
    // Quarta: Quadríceps
    // Quinta: Peito, Tríceps e Ombro
    // Sexta: Glúteo Isolado
    // Sábado: Costa
    // Domingo: Quadríceps e Glúteo
    
    const workoutStructure = {
        segunda: {
            foco: '🦵 POSTERIOR DE COXA (Isquiotibiais)',
            exercicios: [
                { nome: 'Cadeira Flexora', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Mesa Flexora', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Stiff', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Levantamento Terra Romeno', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Afundo com Halteres', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Good Morning', series: intensity.series - 1, repeticoes: intensity.repeticoes, descanso: intensity.descanso }
            ]
        },
        terca: {
            foco: '💪 COSTA e BÍCEPS',
            exercicios: [
                { nome: 'Puxada Frontal (Pulley)', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Remada Curvada', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Remada Unilateral', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Barra Fixa (ou graviton)', series: intensity.series - 1, repeticoes: 'max', descanso: intensity.descanso },
                { nome: 'Rosca Direta', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Rosca Martelo', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Rosca Scott', series: intensity.series - 1, repeticoes: intensity.repeticoes, descanso: intensity.descanso }
            ]
        },
        quarta: {
            foco: '💪 QUADRÍCEPS',
            exercicios: [
                { nome: 'Agachamento Livre', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Leg Press 45°', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Cadeira Extensora', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Agachamento Hack', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Afundo', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Agachamento Búlgaro', series: intensity.series - 1, repeticoes: intensity.repeticoes, descanso: intensity.descanso }
            ]
        },
        quinta: {
            foco: '🎯 PEITO, TRÍCEPS e OMBRO',
            exercicios: [
                { nome: 'Supino Reto', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Supino Inclinado', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Crucifixo', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Desenvolvimento', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Elevação Lateral', series: intensity.series, repeticoes: intensity.repeticoes + 4, descanso: intensity.descanso },
                { nome: 'Tríceps Corda', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Tríceps Testa', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso }
            ]
        },
        sexta: {
            foco: '🍑 GLÚTEO ISOLADO',
            exercicios: [
                { nome: 'Elevação Pélvica', series: intensity.series + 1, repeticoes: '12-15', descanso: intensity.descanso },
                { nome: 'Cadeira Abdutora', series: intensity.series, repeticoes: '15-20', descanso: intensity.descanso },
                { nome: 'Glúteo no Cabo', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Agachamento Sumô', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Coice no Cabo', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Passada Lateral', series: intensity.series, repeticoes: '12-15 cada', descanso: intensity.descanso },
                { nome: 'Ponte Unilateral', series: intensity.series - 1, repeticoes: '15 cada', descanso: intensity.descanso }
            ]
        },
        sabado: {
            foco: '💪 COSTA (Ênfase em Espessura e Largura)',
            exercicios: [
                { nome: 'Puxada Aberta', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Remada Cavalinho', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Pulley Frente', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Remada Máquina', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Encolhimento (Trapézio)', series: intensity.series, repeticoes: '12-15', descanso: intensity.descanso },
                { nome: 'Crucifixo Inverso', series: intensity.series - 1, repeticoes: '12-15', descanso: intensity.descanso }
            ]
        },
        domingo: {
            foco: '🦵 QUADRÍCEPS e GLÚTEO (Combinado)',
            exercicios: [
                { nome: 'Agachamento Profundo', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Leg Press (pés altos)', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Cadeira Extensora', series: intensity.series, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Elevação Pélvica com Carga', series: intensity.series, repeticoes: '10-12', descanso: intensity.descanso },
                { nome: 'Agachamento Búlgaro', series: intensity.series - 1, repeticoes: intensity.repeticoes, descanso: intensity.descanso },
                { nome: 'Cadeira Abdutora', series: intensity.series, repeticoes: '15-20', descanso: intensity.descanso },
                { nome: 'Afundo com Salto', series: intensity.series - 1, repeticoes: '10-12', descanso: intensity.descanso }
            ]
        }
    };

    // Array com os dias da semana na ordem correta
    const daysOrder = ['segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado', 'domingo'];
    const daysNames = {
        segunda: 'Segunda-feira',
        terca: 'Terça-feira',
        quarta: 'Quarta-feira',
        quinta: 'Quinta-feira',
        sexta: 'Sexta-feira',
        sabado: 'Sábado',
        domingo: 'Domingo'
    };

    // Montar o plano semanal
    const weeklyPlan = daysOrder.map(day => ({
        day: daysNames[day],
        dayKey: day,
        foco: workoutStructure[day].foco,
        exercicios: workoutStructure[day].exercicios,
        cardios: cardioOptions[day],
        intensity: intensity
    }));

    return { weeklyPlan, objetivo, userData };
}

// Display workout plan
function displayWorkoutPlan(planData, userData) {
    const container = document.getElementById('workoutContent');
    const { weeklyPlan, objetivo } = planData;
    
    // Header com informações do usuário
    let html = `
        <div class="user-info" style="background: linear-gradient(135deg, rgba(139,0,0,0.15), rgba(0,0,0,0.3)); padding: 1.5rem; border-radius: 15px; margin-bottom: 2rem; border: 1px solid rgba(139,0,0,0.3);">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                <div>
                    <i class="fas fa-user" style="color: #8B0000; margin-right: 8px;"></i>
                    <strong>Aluno:</strong> ${userData.nome}
                </div>
                <div>
                    <i class="fas fa-bullseye" style="color: #8B0000; margin-right: 8px;"></i>
                    <strong>Objetivo:</strong> ${getObjetivoNome(objetivo)}
                </div>
                <div>
                    <i class="fas fa-chart-line" style="color: #8B0000; margin-right: 8px;"></i>
                    <strong>Nível:</strong> ${getNivelNome(userData.nivel)}
                </div>
                <div>
                    <i class="fas fa-calendar-alt" style="color: #8B0000; margin-right: 8px;"></i>
                    <strong>Idade:</strong> ${userData.idade} anos
                </div>
            </div>
            <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(139,0,0,0.3); text-align: center;">
                <i class="fas fa-heartbeat" style="color: #8B0000;"></i> 
                <strong>Cardio diário incluso!</strong> Todos os treinos têm sessão cardiovascular
            </div>
        </div>
    `;
    
    // Gerar cada dia de treino
    weeklyPlan.forEach(day => {
        html += `
            <div class="day-card" style="margin-bottom: 1.5rem;">
                <div class="day-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                    <div class="day-name" style="font-size: 1.4rem; font-weight: 700; color: #8B0000;">
                        <i class="fas fa-calendar-day"></i> ${day.day}
                    </div>
                    <div class="day-focus" style="background: rgba(139, 0, 0, 0.3); padding: 0.5rem 1rem; border-radius: 20px;">
                        🎯 ${day.foco}
                    </div>
                </div>
                
                <!-- Exercícios -->
                <h4 style="margin: 1rem 0 0.5rem 0; color: #cc3333;">
                    <i class="fas fa-dumbbell"></i> Exercícios:
                </h4>
                <ul class="exercise-list" style="list-style: none;">
        `;
        
        day.exercicios.forEach((exercicio, index) => {
            html += `
                <li class="exercise-item" style="display: flex; align-items: center; padding: 0.8rem; background: rgba(255, 255, 255, 0.05); margin-bottom: 0.5rem; border-radius: 10px;">
                    <div class="exercise-icon" style="width: 40px; color: #8B0000;">
                        <i class="fas fa-dumbbell"></i>
                    </div>
                    <div class="exercise-details" style="flex: 1;">
                        <div class="exercise-name" style="font-weight: 600;">${exercicio.nome}</div>
                        <div class="exercise-sets" style="font-size: 0.85rem; color: #ccc;">
                            ${exercicio.series} séries × ${exercicio.repeticoes} reps | Descanso: ${exercicio.descanso}
                        </div>
                    </div>
                </li>
            `;
        });
        
        // Cardio do dia
        html += `
                </ul>
                
                <div style="margin-top: 1rem; padding: 1rem; background: linear-gradient(135deg, rgba(139,0,0,0.2), rgba(0,0,0,0.3)); border-radius: 10px; border-left: 3px solid #8B0000;">
                    <h4 style="margin: 0 0 0.5rem 0; color: #cc3333;">
                        <i class="fas fa-heartbeat"></i> Cardio do Dia:
                    </h4>
                    <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                        ${day.cardios.map(cardio => `
                            <div style="background: rgba(0,0,0,0.3); padding: 0.5rem 1rem; border-radius: 8px;">
                                <strong>${cardio.nome}</strong><br>
                                <span style="font-size: 0.85rem;">⏱️ ${cardio.tempo} | 🔥 Intensidade: ${cardio.intensidade}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div style="margin-top: 0.5rem; font-size: 0.8rem; color: #ccc;">
                        <i class="fas fa-info-circle"></i> Escolha UMA das opções de cardio acima
                    </div>
                </div>
                
                <div style="margin-top: 0.8rem; display: flex; gap: 1rem; font-size: 0.85rem; color: #8B0000;">
                    <div><i class="fas fa-hourglass-half"></i> Duração total: 60-75 minutos</div>
                    <div><i class="fas fa-fire"></i> Intensidade: ${userData.nivel === 'avancado' ? 'Alta' : userData.nivel === 'intermediario' ? 'Média' : 'Moderada'}</div>
                </div>
            </div>
        `;
    });
    
    // Dicas Gerais
    html += `
        <div style="background: linear-gradient(135deg, rgba(139,0,0,0.2), rgba(0,0,0,0.3)); padding: 1.5rem; border-radius: 15px; margin-top: 1rem;">
            <h3 style="color: #8B0000; margin-bottom: 1rem;">
                <i class="fas fa-lightbulb"></i> Dicas Específicas para sua Divisão de Treino:
            </h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                <div>
                    <i class="fas fa-check-circle" style="color: #8B0000;"></i>
                    <strong>Posterior (Segunda):</strong> Foque na conexão mente-músculo, execute movimentos controlados
                </div>
                <div>
                    <i class="fas fa-check-circle" style="color: #8B0000;"></i>
                    <strong>Costa/Bíceps (Terça):</strong> Mantenha escápulas retraídas, cotovelos alinhados
                </div>
                <div>
                    <i class="fas fa-check-circle" style="color: #8B0000;"></i>
                    <strong>Quadríceps (Quarta):</strong> Profundidade é key, joelhos alinhados com pés
                </div>
                <div>
                    <i class="fas fa-check-circle" style="color: #8B0000;"></i>
                    <strong>Peito/Tríceps/Ombro (Quinta):</strong> Estabilize escapulas, ombros para trás
                </div>
                <div>
                    <i class="fas fa-check-circle" style="color: #8B0000;"></i>
                    <strong>Glúteo Isolado (Sexta):</strong> Ativação glútea antes, contração máxima no topo
                </div>
                <div>
                    <i class="fas fa-check-circle" style="color: #8B0000;"></i>
                    <strong>Costa (Sábado):</strong> Varie pegadas para estimular diferentes áreas
                </div>
                <div>
                    <i class="fas fa-check-circle" style="color: #8B0000;"></i>
                    <strong>Quadríceps/Glúteo (Domingo):</strong> Mantenha intensidade moderada para não sobrecarregar
                </div>
            </div>
        </div>
        
        <div style="margin-top: 1rem; padding: 1rem; text-align: center; font-size: 0.85rem; color: #ccc; background: rgba(0,0,0,0.3); border-radius: 10px;">
            <i class="fas fa-heart" style="color: #8B0000;"></i> 
            <strong>Cardio é OBRIGATÓRIO todos os dias!</strong> Adapte a intensidade conforme sua recuperação
            <br><br>
            <i class="fas fa-shield-alt"></i> Consulte um profissional de educação física e médico antes de iniciar
        </div>
    `;
    
    container.innerHTML = html;
}

// Helper functions
function getObjetivoNome(objetivo) {
    const objetivos = {
        'emagrecer': 'Emagrecimento / Perda de peso',
        'hipertrofia': 'Hipertrofia / Ganho de massa muscular',
        'definicao': 'Definição muscular',
        'saude': 'Saúde e bem-estar',
        'resistencia': 'Resistência cardiovascular'
    };
    return objetivos[objetivo] || objetivo;
}

function getNivelNome(nivel) {
    const niveis = {
        'iniciante': 'Iniciante (0-6 meses)',
        'intermediario': 'Intermediário (6-18 meses)',
        'avancado': 'Avançado (+18 meses)'
    };
    return niveis[nivel] || nivel;
}

// Download as PDF
function downloadAsPDF() {
    window.print();
}

// Style for print (PDF)
const style = document.createElement('style');
style.textContent = `
    @media print {
        body * {
            visibility: hidden;
        }
        .workout-plan, .workout-plan * {
            visibility: visible;
        }
        .workout-plan {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            margin: 0;
            padding: 20px;
            background: white;
            color: black;
        }
        .btn-secondary {
            display: none;
        }
        .day-card {
            background: #f9f9f9 !important;
            border-left: 4px solid #8B0000 !important;
            break-inside: avoid;
            page-break-inside: avoid;
        }
        .user-info {
            background: #f0f0f0 !important;
        }
    }
`;
document.head.appendChild(style);
