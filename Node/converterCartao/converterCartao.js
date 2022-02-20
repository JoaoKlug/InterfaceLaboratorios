function ConverterCartao(decimalCardNumber)
{
    var binary = DecimalBinary(decimalCardNumber);

    let facilityCodeBinary = new Array(8);
    let indexfacilityCodeBinary = 0;
    for (let i = 15;  i <= 22; i++) {
        facilityCodeBinary[indexfacilityCodeBinary] = binary[i];
        indexfacilityCodeBinary++;
    }
    // console.log(`FacilityCodeBinary: ${facilityCodeBinary}`);

    let cardNumberBinary = new Array(16);
    let indexCardNumberBinary = 0;
    for(let i = 23; i<binary.length ; i++){
        cardNumberBinary[indexCardNumberBinary] = binary[i];
        indexCardNumberBinary++;
    }
    console.log(`CardNumberBinary: ${cardNumberBinary}`)

    let facilityCode = BinaryDecimal(facilityCodeBinary);
    let cardNumber = BinaryDecimal(cardNumberBinary);
    const cracha = facilityCode*100000 + cardNumber;

    return cracha;
}

function DecimalBinary(decimal)
{
    var binary = new Array(39);
    let bit, i = binary.length-1;
    while (decimal != 0) {
        bit = decimal % 2;
        decimal = parseInt(decimal / 2);
        binary[i] = bit;
        i--;
    }
    return binary;
}

function BinaryDecimal(binary)
{
    let decimal = 0;
    multiplicador =1;
    i = binary.length-1;
    while(i>=0){
        decimal = decimal+ binary[i]*multiplicador;
        multiplicador = multiplicador*2;
        i--;
    }
    return decimal;
}
//Simulando o "chamamento" da função (Somente para fins demonstrativos)

var decimalCardNumber = 4306444091;
//console.log(`DecimalCardNumber: ${decimalCardNumber}`);
var cracha = ConverterCartao(decimalCardNumber);
//console.log(`cracha: ${cracha}`);