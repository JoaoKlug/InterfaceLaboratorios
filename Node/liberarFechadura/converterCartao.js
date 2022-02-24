module.exports = function ConverterCartao(hexCardCode)
{
    let binaryCardCode = DecimalToBinary(parseInt(hexCardCode, 16));

    let facilityCodeBinary = new Array(8);
    let indexfacilityCodeBinary = 0;
    for (let i = 15;  i <= 22; i++) {
        facilityCodeBinary[indexfacilityCodeBinary] = binaryCardCode[i];
        indexfacilityCodeBinary++;
    }

    let cardNumberBinary = new Array(16);
    let indexCardNumberBinary = 0;
    for(let i = 23; i < binaryCardCode.length ; i++){
        cardNumberBinary[indexCardNumberBinary] = binaryCardCode[i];
        indexCardNumberBinary++;
    }

    let facilityCode = BinaryToDecimal(facilityCodeBinary);
    let cardNumber = BinaryToDecimal(cardNumberBinary);
    
    let cracha = facilityCode*100000 + cardNumber;
    return cracha;
}
function DecimalToBinary(decimal)
{
    let binary = new Array(39);
    let bit; 
    let i = binary.length-1;
    while (decimal != 0) {
        bit = decimal%2;
        decimal = parseInt(decimal/2);
        binary[i] = bit;
        i--;
    }
    return binary;
}

function BinaryToDecimal(binary)
{
    let decimal = 0;
    let exponent = 1;
    i = binary.length-1;
    while(i >= 0){
        decimal = decimal+ binary[i]*exponent;
        exponent = exponent*2;
        i--;
    }
    return decimal;
}
