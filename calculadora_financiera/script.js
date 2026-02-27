
    document.addEventListener('DOMContentLoaded', () => {
    // ========================
    //  Obtener referencias a los elementos del DOM
    // ========================
    const amount = document.getElementById("amount"),          // Input del monto inicial
          ir = document.getElementById("ir"),                // Input de tasa de interés (%)
          years = document.getElementById("years"),          // Input de tiempo en años
          emi = document.getElementById("emi"),              // Elemento donde se muestra el monto final
          totalInterest = document.getElementById("totalInteres"), // Elemento donde se muestra el interés total
          buttons = document.querySelectorAll('.yes-no-btn'),    // Botones Yes/No para tipo de interés
          calculateBtn = document.querySelector('.card button'); // Botón Calculate

    // ========================
    //  Variable para saber si el interés es compuesto
    // ========================
    let isCompound = false; // Por defecto: interés simple

    // ========================
    //  Configurar eventos de los botones Yes/No
    // ========================
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Quitar la clase "active" de todos los botones
            buttons.forEach(b => b.classList.remove('active'));
            // Marcar como activo el botón clickeado
            btn.classList.add('active');

            // Actualizar la variable booleana según el botón
            // true si es "yes", false si es "no"
            isCompound = btn.dataset.value === "yes";

            // Opcional: mostrar en consola para depuración
            console.log("Is compound:", isCompound);
        });
    });

    // ========================
    //  Función para calcular el interés
    // ========================
    function calculateInterest() {
        // Obtener valores de los inputs y convertirlos a número
        const principal = parseFloat(amount.value);
        const rate = parseFloat(ir.value) / 100; // Convertir % a decimal
        const time = parseFloat(years.value);

        // Validación: verificar que los valores sean números
        if (isNaN(principal) || isNaN(rate) || isNaN(time)) {
            alert("Please enter valid numbers in all fields.");
            return; // Si no son válidos, salir de la función
        }

        // Variables para almacenar los resultados
        let totalAmount = 0;    // Monto final
        let interestAmount = 0; // Interés total

        // ========================
        //  Cálculo según tipo de interés
        // ========================
        if (isCompound) {
            // Interés compuesto: A = P * (1 + r)^t
            totalAmount = principal * Math.pow(1 + rate, time);
            interestAmount = totalAmount - principal;
        } else {
            // Interés simple: A = P * (1 + r * t)
            totalAmount = principal * (1 + rate * time);
            interestAmount = totalAmount - principal;
        }

        // ========================
        //  Actualizar el HTML con los resultados
        // ========================
        // Mostrar el monto final con 2 decimales
        emi.textContent = totalAmount.toFixed(2);
        // Mostrar el interés total con 2 decimales
        totalInterest.textContent = interestAmount.toFixed(2);
    }

    // ========================
    //   Asociar la función al botón Calculate
    // ========================
    calculateBtn.addEventListener('click', calculateInterest);
});