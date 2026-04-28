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
    
    // Base exercises database
    const exercises = {
        emagrecer: {
            cardio: ['Corrida intervalada', 'Pular corda', 'Spinning', 'HIIT - Jumping Jacks'],
            superiores: ['Flexões', 'Tríceps no banco', 'Remada curvada com halteres', 'Desenvolvimento'],
            inferiores: ['Agachamentos', 'Afundos', 'Leg press', 'Cadeira extensora'],
            core: ['Prancha frontal', 'Abdominal crunch', 'Elevação de pernas', 'Russian twist']
        },
        hipertrofia: {
            push: ['Supino reto', 'Desenvolvimento', 'Paralelas', 'Tríceps corda', 'Elevação lateral'],
            pull: ['Puxada frontal', 'Remada cavalinho', 'Rosca direta', 'Rosca martelo', 'Encolhimento'],
            legs: ['Agachamento livre', 'Levantamento terra', 'Leg press 45°', 'Cadeira flexora', 'Panturrilha']
        },
        definicao: {
            fullbody: ['Agachamento com salto', 'Flexão explosiva', 'Burpees', 'Kettlebell swing', 'Mountain climbers']
        },
        saude: {
            funcional: ['Alongamento dinâmico', 'Yoga básica', 'Pilates', 'Caminhada rápida', 'Mobilidade articular']
        },
        resistencia: {
            endurance: ['Cooper 5km', 'Natação', 'Ciclismo', 'Remo', 'Circuito aeróbico']
        }
    };

    let weeklyPlan = [];
    
    // Adjust sets/reps based on level
    const getSetsReps = () => {
        const levels = {
            iniciante: { series: 3, repeticoes: '10-12', descanso: '60s' },
            intermediario: { series: 4, repeticoes: '8-10', descanso: '90s' },
            avancado: { series: 5, repeticoes: '6-8', descanso: '120s' }
        };
        return levels[nivel] || levels.iniciante;
    };

    const intensity = getSetsReps();

    // Generate 7-day plan
    const days = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
    
    if (objetivo === 'emagrecer') {
        weeklyPlan = [
            { day: days[0], focus: 'HIIT + Superior', exercises: [...exercises.emagrecer.cardio.slice(0,2), ...exercises.emagrecer.superiores.slice(0,3)] },
            { day: days[1], focus: 'Cardio + Core', exercises: [...exercises.emagrecer.cardio.slice(2,3), ...exercises.emagrecer.core] },
            { day: days[2], focus: 'Inferiores', exercises: exercises.emagrecer.inferiores.slice(0,4) },
            { day: days[3], focus: 'Cardio Intenso', exercises: exercises.emagrecer.cardio },
            { day: days[4], focus: 'Full Body', exercises: [...exercises.emagrecer.superiores.slice(1,3), ...exercises.emagrecer.inferiores.slice(1,3), ...exercises.emagrecer.core.slice(0,2)] },
            { day: days[5], focus: 'Cardio Longo', exercises: ['Cooper 5km', 'Caminhada 1h', 'Pular corda 30min'] },
            { day: days[6], focus: 'Descanso Ativo', exercises: ['Alongamento geral', 'Caminhada leve 30min', 'Alongamento específico'] }
        ];
    } 
    else if (objetivo === 'hipertrofia') {
        weeklyPlan = [
            { day: days[0], focus: 'Push (Peito, Ombro, Tríceps)', exercises: exercises.hipertrofia.push },
            { day: days[1], focus: 'Pull (Costas, Bíceps)', exercises: exercises.hipertrofia.pull },
            { day: days[2], focus: 'Legs (Pernas)', exercises: exercises.hipertrofia.legs },
            { day: days[3], focus: 'Push (Foco em intensidade)', exercises: exercises.hipertrofia.push },
            { day: days[4], focus: 'Pull (Foco em carga)', exercises: exercises.hipertrofia.pull.slice(0,4) },
            { day: days[5], focus: 'Legs + Core', exercises: [...exercises.hipertrofia.legs, ...exercises.emagrecer.core.slice(0,2)] },
            { day: days[6], focus: 'Descanso e Recuperação', exercises: ['Massagem', 'Alongamento', 'Mobilidade'] }
        ];
    }
    else if (objetivo === 'definicao') {
        weeklyPlan = [
            { day: days[0], focus: 'Full Body Power', exercises: exercises.definicao.fullbody },
            { day: days[1], focus: 'Cardio + Core', exercises: [...exercises.emagrecer.cardio.slice(0,3), ...exercises.emagrecer.core] },
            { day: days[2], focus: 'Circuito Superior', exercises: exercises.hipertrofia.push.slice(0,3) },
            { day: days[3], focus: 'Circuito Inferior', exercises: exercises.hipertrofia.legs.slice(0,3) },
            { day: days[4], focus: 'HIIT Avançado', exercises: exercises.emagrecer.cardio },
            { day: days[5], focus: 'Full Body + Cardio', exercises: [...exercises.definicao.fullbody, ...exercises.emagrecer.cardio.slice(0,2)] },
            { day: days[6], focus: 'Recuperação', exercises: ['Yoga', 'Alongamento', 'Respiração'] }
        ];
    }
    else if (objetivo === 'saude') {
        weeklyPlan = [
            { day: days[0], focus: 'Funcional + Mobilidade', exercises: exercises.saude.funcional.slice(0,3) },
            { day: days[1], focus: 'Caminhada + Alongamento', exercises: [...exercises.saude.funcional.slice(2,4), 'Alongamento geral'] },
            { day: days[2], focus: 'Pilates + Yoga', exercises: exercises.saude.funcional.slice(1,4) },
            { day: days[3], focus: 'Funcional Moderado', exercises: exercises.saude.funcional },
            { day: days[4], focus: 'Mobilidade + Core', exercises: [...exercises.emagrecer.core.slice(0,3), 'Mobilidade completa'] },
            { day: days[5], focus: 'Caminhada na Natureza', exercises: ['Caminhada 40min', 'Alongamento dinâmico', 'Respiração'] },
            { day: days[6], focus: 'Descanso Ativo', exercises: ['Lazer ativo', 'Alongamento leve', 'Meditação'] }
        ];
    }
    else if (objetivo === 'resistencia') {
        weeklyPlan = [
            { day: days[0], focus: 'Corrida', exercises: exercises.resistencia.endurance.slice(0,2) },
            { day: days[1], focus: 'Natação', exercises: [exercises.resistencia.endurance[1]] },
            { day: days[2], focus: 'Ciclismo', exercises: [exercises.resistencia.endurance[2]] },
            { day: days[3], focus: 'Circuito Aeróbico', exercises: exercises.resistencia.endurance },
            { day: days[4], focus: 'Remo + Corrida', exercises: [exercises.resistencia.endurance[3], exercises.resistencia.endurance[0]] },
            { day: days[5], focus: 'Longão - Resistência', exercises: ['Cooper 10km', 'Treino intervalado longo'] },
            { day: days[6], focus: 'Recuperação', exercises: ['Alongamento', 'Hidratação intensa', 'Exercícios respiratórios'] }
        ];
    }

    // Add intensity info to each exercise
    weeklyPlan = weeklyPlan.map(day => ({
        ...day,
        intensity: intensity
    }));

    return weeklyPlan;
}

// Display workout plan
function displayWorkoutPlan(plan, userData) {
    const container = document.getElementById('workoutContent');
    
    let html = `<div class="user-info" style="background: rgba(139,0,0,0.1); padding: 1rem; border-radius: 10px; margin-bottom: 2rem;">
                    <p><strong><i class="fas fa-user"></i> Aluno:</strong> ${userData.nome}</p>
                    <p><strong><i class="fas fa-bullseye"></i> Objetivo:</strong> ${getObjetivoNome(userData.objetivo)}</p>
                    <p><strong><i class="fas fa-chart-line"></i> Nível:</strong> ${getNivelNome(userData.nivel)}</p>
                    <p><strong><i class="fas fa-clock"></i> Duração:</strong> 60-90 minutos por treino</p>
                </div>`;
    
    plan.forEach(day => {
        html += `
            <div class="day-card">
                <div class="day-header">
                    <div class="day-name">${day.day}</div>
                    <div class="day-focus">🎯 ${day.focus}</div>
                </div>
                <ul class="exercise-list">
        `;
        
        day.exercises.forEach(exercise => {
            html += `
                <li class="exercise-item">
                    <div class="exercise-icon"><i class="fas fa-dumbbell"></i></div>
                    <div class="exercise-details">
                        <div class="exercise-name">${exercise}</div>
                        <div class="exercise-sets">${day.intensity.series} séries × ${day.intensity.repeticoes} reps | Descanso: ${day.intensity.descanso}</div>
                    </div>
                </li>
            `;
        });
        
        html += `
                </ul>
                <div style="margin-top: 1rem; font-size: 0.85rem; color: #8B0000;">
                    <i class="fas fa-hourglass-half"></i> Tempo estimado: 45-60 minutos
                </div>
            </div>
        `;
    });
    
    // Add tips
    html += `
        <div style="background: rgba(139,0,0,0.2); padding: 1.5rem; border-radius: 15px; margin-top: 1rem;">
            <h3><i class="fas fa-lightbulb"></i> Dicas importantes:</h3>
            <ul style="margin-top: 0.5rem; list-style-position: inside;">
                <li>🔥 Faça sempre 5-10 minutos de aquecimento antes dos treinos</li>
                <li>💧 Mantenha-se hidratado durante toda a sessão</li>
                <li>🎯 Respeite seus limites e evolua gradualmente</li>
                <li>📅 Descanse adequadamente entre os treinos</li>
                <li>🥗 Combine com uma alimentação equilibrada para melhores resultados</li>
            </ul>
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
        'iniciante': 'Iniciante',
        'intermediario': 'Intermediário',
        'avancado': 'Avançado'
    };
    return niveis[nivel] || nivel;
}

// Download as PDF (simplified version using print)
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
        .user-info {
            background: #f0f0f0 !important;
        }
    }
`;
document.head.appendChild(style);
