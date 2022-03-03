/*
Recebe o codigo hexadecimal do cartao(hexCardCode-S-)
Retorna o codigo Wigand do cartao(cracha)
*/
module.exports = function ConverterCartao(hexCardCode)
{
    //Transforma o codigo hexadeciaml em binário
    let binaryCardCode = DecimalToBinary(parseInt(hexCardCode, 16));

    /*Pega o facilityCode em binário(3 primeiros numeros do cracha, sem 0 à esquerda),
    que é a sequencia de bits do 15 ao 22
    */
    let facilityCodeBinary = new Array(8);
    let indexfacilityCodeBinary = 0;
    for (let i = 15;  i <= 22; i++) {
        facilityCodeBinary[indexfacilityCodeBinary] = binaryCardCode[i];
        indexfacilityCodeBinary++;
    }
    
    /*Pega o cardNumber em binário(6 ultimos numeros do cracha),
    que é a sequencia de bits do 23 ao 39
    */
    let cardNumberBinary = new Array(16);
    let indexCardNumberBinary = 0;
    for(let i = 23; i < binaryCardCode.length ; i++){
        cardNumberBinary[indexCardNumberBinary] = binaryCardCode[i];
        indexCardNumberBinary++;
    }

    //Transforma o facilityCode e carNumber em decimal
    let facilityCode = BinaryToDecimal(facilityCodeBinary);
    let cardNumber = BinaryToDecimal(cardNumberBinary);

    //Junta os dois formando o cracha
    let cracha = facilityCode*100000 + cardNumber;
    console.log("Número do cartão convertido: " + cracha)
    return cracha;
}
//Converte Decimal para Binário
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
//Converte Binário em Decimal
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
