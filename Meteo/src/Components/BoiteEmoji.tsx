
function BoiteEmoji() {
    const temp = 30;
    if (temp > 25)
    {
        return(<div className = "square-box-red d-flex justify-content-center align-items-center">
            <div style={{ fontSize: '150px' }}>
            {'\u{1F975}'}
            </div>
        </div>);         
    }
    else if (temp > 16 && temp < 26)
    {
        return(<div className = "square-box-normal d-flex justify-content-center align-items-center">
            <div style={{ fontSize: '150px' }}>
            {'\u{1F60E}'}
            </div>
        </div>);  
    }
    else if (temp > -1 && temp < 16)
    {
        return(<div className = "square-box-normal d-flex justify-content-center align-items-center">
            <div style={{ fontSize: '150px' }}>
            {'\u{2601}'}
            </div>
        </div>);  
    }
    else 
    {
        return(<div className = "square-box-blue d-flex justify-content-center align-items-center">
            <div style={{ fontSize: '150px' }}>
            {'\u{1F976}'}
            </div>
        </div>);
    }
}

export default BoiteEmoji;
