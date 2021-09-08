let IPS_PRI = require('../../lib/IPS_PRIVADA.json');

module.exports = function (req, res) { 
    let search = req.query.term.toUpperCase();
    let data = [];
    for (let ips of IPS_PRI) {
        let id =ips.id;
        let text = String(ips.text).toUpperCase();
    
        if (text.indexOf(search) !== -1){
            
            let array = { id,text};
            data.push(array);
            
            
        }
        
    }
    res.json(data)
    
    
    
}