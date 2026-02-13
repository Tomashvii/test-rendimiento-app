// Variables globales
let registros = [];

// Cargar registros del localStorage al iniciar
document.addEventListener('DOMContentLoaded', () => {
    cargarHistorial();
    calcularMermaAutomatica();
});

// Calcular merma automáticamente cuando cambian los pesos
document.getElementById('pesoBruto').addEventListener('input', calcularMermaAutomatica);
document.getElementById('pesoNeto').addEventListener('input', calcularMermaAutomatica);

function calcularMermaAutomatica() {
    const pesoBruto = parseFloat(document.getElementById('pesoBruto').value) || 0;
    const pesoNeto = parseFloat(document.getElementById('pesoNeto').value) || 0;
    
    if (pesoBruto > 0 && pesoNeto > 0 && pesoNeto <= pesoBruto) {
        const merma = pesoBruto - pesoNeto;
        document.getElementById('pesoMerma').value = merma.toFixed(3);
    } else {
        document.getElementById('pesoMerma').value = '';
    }
}

// Manejar el envío del formulario
document.getElementById('rendimientoForm').addEventListener('submit', (e) => {
    e.preventDefault();
    calcularRendimiento();
});

function calcularRendimiento() {
    // Obtener valores del formulario
    const producto = document.getElementById('producto').value;
    const valorKilo = parseFloat(document.getElementById('valorKilo').value);
    const pesoBruto = parseFloat(document.getElementById('pesoBruto').value);
    const pesoNeto = parseFloat(document.getElementById('pesoNeto').value);

    // Validaciones
    if (pesoNeto > pesoBruto) {
        alert('⚠️ El peso neto no puede ser mayor que el peso bruto');
        return;
    }

    if (pesoBruto <= 0 || pesoNeto <= 0) {
        alert('⚠️ Los pesos deben ser mayores a cero');
        return;
    }

    // Cálculos según las fórmulas del documento
    const pesoMerma = pesoBruto - pesoNeto;
    const porcRendimiento = (pesoNeto / pesoBruto) * 100;
    const porcMerma = 100 - porcRendimiento;
    const valorKiloLimpio = valorKilo / (porcRendimiento / 100);
    
    // Cálculos de costos
    const costoTotal = pesoBruto * valorKilo;
    const perdidaMerma = pesoMerma * valorKilo;

    // Mostrar resultados
    document.getElementById('porcRendimiento').textContent = porcRendimiento.toFixed(2) + '%';
    document.getElementById('porcMerma').textContent = porcMerma.toFixed(2) + '%';
    document.getElementById('pesoMermaRes').textContent = pesoMerma.toFixed(3) + ' kg';
    document.getElementById('valorKiloLimpio').textContent = '$' + valorKiloLimpio.toFixed(2);
    document.getElementById('costoTotal').textContent = '$' + costoTotal.toFixed(2);
    document.getElementById('perdidaMerma').textContent = '$' + perdidaMerma.toFixed(2);

    // Mostrar la tarjeta de resultados con animación
    const resultadosCard = document.getElementById('resultados');
    resultadosCard.classList.remove('hidden');
    resultadosCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Guardar los datos actuales para el registro
    window.ultimoCalculo = {
        producto,
        valorKilo,
        pesoBruto,
        pesoNeto,
        pesoMerma,
        porcRendimiento,
        porcMerma,
        valorKiloLimpio,
        costoTotal,
        perdidaMerma,
        fecha: new Date().toLocaleString('es-CO')
    };
}

function guardarRegistro() {
    if (!window.ultimoCalculo) {
        alert('⚠️ Primero debes calcular el rendimiento');
        return;
    }

    // Agregar al array de registros
    registros.push(window.ultimoCalculo);
    
    // Guardar en localStorage
    localStorage.setItem('registrosRendimiento', JSON.stringify(registros));
    
    // Actualizar la tabla
    actualizarTabla();
    
    // Mostrar mensaje de éxito
    alert('✅ Registro guardado exitosamente');
    
    // Limpiar el formulario
    document.getElementById('rendimientoForm').reset();
    document.getElementById('resultados').classList.add('hidden');
    window.ultimoCalculo = null;
    
    // Scroll a historial
    document.getElementById('historial').scrollIntoView({ behavior: 'smooth' });
}

function cargarHistorial() {
    const guardados = localStorage.getItem('registrosRendimiento');
    if (guardados) {
        registros = JSON.parse(guardados);
        actualizarTabla();
    }
}

function actualizarTabla() {
    const tbody = document.getElementById('tablaBody');
    tbody.innerHTML = '';

    if (registros.length === 0) {
        document.getElementById('historial').classList.add('hidden');
        return;
    }

    document.getElementById('historial').classList.remove('hidden');

    registros.forEach((registro, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${registro.producto}</strong><br><small>${registro.fecha}</small></td>
            <td>${registro.pesoBruto.toFixed(3)} kg</td>
            <td>${registro.pesoNeto.toFixed(3)} kg</td>
            <td><span style="color: var(--primary); font-weight: 600;">${registro.porcRendimiento.toFixed(2)}%</span></td>
            <td><span style="color: var(--danger); font-weight: 600;">${registro.porcMerma.toFixed(2)}%</span></td>
            <td><strong>$${registro.valorKiloLimpio.toFixed(2)}</strong></td>
            <td>
                <button class="btn-icon" onclick="eliminarRegistro(${index})" title="Eliminar">
                    🗑️
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function eliminarRegistro(index) {
    if (confirm('¿Estás seguro de eliminar este registro?')) {
        registros.splice(index, 1);
        localStorage.setItem('registrosRendimiento', JSON.stringify(registros));
        actualizarTabla();
    }
}

function limpiarHistorial() {
    if (confirm('¿Estás seguro de eliminar TODOS los registros? Esta acción no se puede deshacer.')) {
        registros = [];
        localStorage.removeItem('registrosRendimiento');
        actualizarTabla();
        alert('✅ Historial limpiado exitosamente');
    }
}

// Formatear números con separadores de miles
function formatearMoneda(numero) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(numero);
}

// Prevenir que el peso neto sea mayor que el bruto
document.getElementById('pesoNeto').addEventListener('blur', function() {
    const pesoBruto = parseFloat(document.getElementById('pesoBruto').value) || 0;
    const pesoNeto = parseFloat(this.value) || 0;
    
    if (pesoNeto > pesoBruto && pesoBruto > 0) {
        alert('⚠️ El peso neto no puede ser mayor que el peso bruto');
        this.value = '';
        document.getElementById('pesoMerma').value = '';
    }
});
