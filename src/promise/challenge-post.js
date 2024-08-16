import fetch  from "node-fetch";
const API='https://api.escuelajs.co/api/v1';
const APICOFIDI='https://portaltest.cofidiguatemala.com/webservicefront/factwsfront.asmx';


    async function postData(urlApi, data) {
        try {
            const response = await fetch(urlApi, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml'
                },
                body: data
            });
    
            // Verificar si la solicitud fue exitosa (código de estado 2xx)
            if (!response.ok) {
                throw new Error(`Error en la solicitud. Código: ${response.status}`);
            }
    
            // Convertir la respuesta a texto
            const responseData = await response.text();
            /*console.log('Respuesta:', responseData);*/ 
    
            // Puedes devolver la respuesta si es necesario
            return responseData;
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
            throw error; // Puedes manejar el error según tus necesidades
        }
    }
    
    const data = 
        `<SOAP-ENV:Envelope xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
        xmlns:ws="http://www.fact.com.mx/schema/ws" >
        <SOAP-ENV:Header/>
        <SOAP-ENV:Body>
            <ws:RequestTransaction>
                <ws:Requestor>8A454E3F-CEA1-41D8-A13A-A748A4891BBE</ws:Requestor>
                <ws:Transaction>SYSTEM_REQUEST</ws:Transaction>
                <ws:Country>GT</ws:Country>
                <ws:Entity>800000001026</ws:Entity>
                <ws:User>8A454E3F-CEA1-41D8-A13A-A748A4891BBE</ws:User>
                <ws:UserName>TEST</ws:UserName>
                <ws:Data1>POST_DOCUMENT_SAT</ws:Data1>
                <ws:Data2>

                    

                </ws:Data2>
                <ws:Data3></ws:Data3>
            </ws:RequestTransaction>
        </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>`;
    
    postData(`${APICOFIDI}`, data)
        .then(responseData => {
            // Puedes realizar acciones adicionales con la respuesta si es necesario
            console.log('Procesando la respuesta:');
            console.log(responseData.replace(/>\s*</g, '>\n<'));;
        })
        .catch(error => {
            // Manejar el error según tus necesidades
            console.error('Error en la solicitud:', error.message);
        });


        /*function postData(urlApi, data){
    const response = fetch(urlApi, {
        method: 'POST',
        mode: 'cors', 
        credetianls: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
    });
    return response; 
}

const data = {
        "title": "New Product",
        "price": 999,
        "description": "A description",
        "categoryId": 1,
        "images": ["https://placeimg.com/640/480/any"]
}

postData(`${API}/products`, data)
    .then(response => response.json())
    .then(data => console.log(data));*/