let Cant_T1 = 0;
let Cant_T2 = 0;
let Cant_T3 = 0;

let Temperatura = 20;

let auxDegra = 1;
let Flag_T3 = true;
let Flag_T2 = true;

let FlagP_7 = false;

let Bt = document.getElementById("Btn_Ini");
let Lq1 = document.getElementById("Liquid_T1");
let Lq2 = document.getElementById("Liquid_T2");
let Lq3 = document.getElementById("Liquid_T3");
let Bom1 = document.getElementById("Img_bom1");
let Bom2 = document.getElementById("Img_bom2");

Bt.addEventListener("click", Iniciar);

function Iniciar() {
  document.getElementById("Estado").innerText = "Llenando Tanque Central";
  document.getElementById("V_A").innerText = "Abierta";
  document.getElementById("V_B").innerText = "Abierta";
  Bt.disabled = true;
  Flag_T3 = false;
  Flag_T2 = false;
  setTimeout(REini, 10000);
  Bom1.classList.add("F_rojo");
  Bom2.classList.add("F_rojo");
  Ini_LLenado1();
}

function REini() {
  if (Flag_T2 && Flag_T3) {
    Bt.disabled = false;
    Cant_T1 = 0;
    Cant_T2 = 0;
    Cant_T3 = 0;
    FlagP_7 = false;
    auxDegra = 1;
    Lq2.style.background = "purple";
    Lq3.style.background = "purple";
    Bom1.classList.remove("F_rojo");
    Bom2.classList.remove("F_rojo");
  } else {
    setTimeout(REini, 100);
  }
}

function Ini_LLenado1() {
  let Por = (Cant_T1 / 290) * 100;
  document.getElementById("Porcen_T1").innerText = `${Math.round(Por)}`;
  if (Cant_T1 < 290) {
    if (Por < 75) {
      Lq1.style.background = "linear-gradient(90deg, blue, red)";
    } else if (Por < 85) {
      Lq1.style.background = "linear-gradient(45deg, blue, red)";
    } else if (Por < 95) {
      Lq1.style.background = "linear-gradient(0deg, blue, red)";
    }
    if (Cant_T1 < 193) {
      Cant_T1 += 4;
    } else {
      document.getElementById("V_A").innerText = "Cerrada";
      Cant_T1 += 2;
    }
    Lq1.style.height = `${Cant_T1}px`;
    setTimeout(Ini_LLenado1, 100);
  } else {
    document.getElementById("V_B").innerText = "Cerrada";
    document.getElementById("Estado").innerText = "Removiendo y Calentando";
    setTimeout(Calentar, 1000);
    setTimeout(() => {
      Lq1.style.background = "Purple";
      Lq1.style.height = "290px";
      Cant_T1 = 290;
      setTimeout(() => {
        document.getElementById("Estado").innerText = "Vaciando Tanque Central";
        document.getElementById("Est_B1").innerText = "Encendida";
        document.getElementById("Est_B2").innerText = "Encendida";
        Bom1.classList.remove("F_rojo");
        Bom2.classList.remove("F_rojo");
        Bom1.classList.add("F_verde");
        Bom2.classList.add("F_verde");
        Vaciado1();
      }, 10000);
    }, 5000);
  }
}

function Calentar() {
  if (Temperatura < 175) {
    Temperatura += 5;
    document.getElementById("Temp").innerText = `${Temperatura}`;
    setTimeout(Calentar, 450);
  }
}

function Enfriar() {
  if (Temperatura > 20) {
    Temperatura -= 5;
    document.getElementById("Temp").innerText = `${Temperatura}`;
    setTimeout(Enfriar, 1000);
  }
}

function Vaciado1() {
  document.getElementById("Porcen_T1").innerText = `${Math.round(
    (Cant_T1 / 290) * 100
  )}`;
  if (Cant_T1 > 0) {
    Cant_T1 -= 3;
    Lq1.style.height = `${Cant_T1}px`;
    if (Cant_T1 > 190) {
      llenado2(1.5);
      llenado3(1.5);
    } else {
      llenado2(2);
      if (!FlagP_7) {
        Bom1.classList.remove("F_verde");
        Bom1.classList.add("F_rojo");
        document.getElementById("Est_B1").innerText = "Apagada";
        document.getElementById("Estado").innerText = "Llenando Tanque Derecho";
        document.getElementById("V_D").innerText = "Abierta";
        FlagP_7 = !FlagP_7;
        llenado3_2();
      }
    }
    setTimeout(Vaciado1, 100);
  } else {
    Enfriar();
    Bom2.classList.remove("F_verde");
    Bom2.classList.add("F_rojo");
    document.getElementById("Est_B2").innerText = "Apagada";
    document.getElementById("V_C").innerText = "Abierta";
    document.getElementById("Estado").innerText = "Llenando Tanque Izquierdo";
    llenado2_2();
  }
}

function llenado2(C) {
  document.getElementById("Porcen_T2").innerText = `${Math.round(
    (Cant_T2 / 290) * 100
  )}`;

  if (Cant_T2 < 290) {
    Cant_T2 += C;
    Lq2.style.height = `${Cant_T2}px`;
  }
}

function llenado2_2(C) {
  document.getElementById("Porcen_T2").innerText = `${Math.round(
    (Cant_T2 / 291) * 100
  )}`;

  if (Cant_T2 < 290) {
    Cant_T2 += 2;
    Lq2.style.height = `${Cant_T2}px`;
    Lq2.style.background = `linear-gradient(to bottom, blue 0.5%, purple ${
      auxDegra / 5
    }%)`;
    auxDegra++;
    setTimeout(llenado2_2, 100);
  } else {
    document.getElementById("V_C").innerText = "Cerrada";
    Lq2.style.background = "#6a72ef";
    setTimeout(Camb_C2, 5000);
  }
}

function Camb_C2() {
  document.getElementById("Estado").innerText = "Removiendo Tanque Derecho";
  Lq2.style.background = "deeppink";
  setTimeout(() => {
    document.getElementById("Estado").innerText = "Vaciando Tanque Derecho";
    Vaciar2();
  }, 10000);
}

function Vaciar2() {
  document.getElementById("Porcen_T2").innerText = `${Math.round(
    (Cant_T2 / 290) * 100
  )}`;

  if (Cant_T2 > 0) {
    Cant_T2 -= 2;
    Lq2.style.height = `${Cant_T2}px`;
    setTimeout(Vaciar2, 100);
  } else {
    Flag_T2 = true;
  }
}

function llenado3(C) {
  document.getElementById("Porcen_T3").innerText = `${Math.round(
    (Cant_T3 / 290) * 100
  )}`;

  if (Cant_T3 < 290) {
    Cant_T3 += C;
    Lq3.style.height = `${Cant_T3}px`;
  } else {
  }
}

function llenado3_2() {
  document.getElementById("Porcen_T3").innerText = `${Math.round(
    (Cant_T3 / 291) * 100
  )}`;

  if (Cant_T3 < 290) {
    Cant_T3 += 2;
    Lq3.style.height = `${Cant_T3}px`;
    if (Lq3.style.background != "orange") {
      Lq3.style.background = "orange";
    }
    setTimeout(llenado3_2, 100);
  } else {
    document.getElementById("V_D").innerText = "Cerrada";
    document.getElementById("Estado").innerText = "Removiendo Tanque Izquierdo";

    setTimeout(() => {
      document.getElementById("Estado").innerText = "Vaciando Tanque Izquierdo";
      Vaciar3();
    }, 20000);
  }
}

function Vaciar3() {
  document.getElementById("Porcen_T3").innerText = `${Math.round(
    (Cant_T3 / 290) * 100
  )}`;

  if (Cant_T3 > 0) {
    Cant_T3 -= 2;
    Lq3.style.height = `${Cant_T3}px`;
    setTimeout(Vaciar3, 100);
  } else {
    Flag_T3 = true;
  }
}
