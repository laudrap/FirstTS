

function IlFait()
{
    const temp = 30;

    if (temp > 25)
    {
        return(<div style={{position: 'fixed', bottom: 100, right: 570}}>
                <p className = "text-danger">Il fait {temp} °C</p>
            </div>);
    }
    else if (temp < 0)
    {
        return(<div style={{ position: 'fixed', bottom: 0 }}>
        <p className = "text-primary">Il fait {temp} °C</p> </div>);
    }
    else{
        return(<div style={{ position: 'fixed', bottom: 0 }}>
            <p>Il fait {temp} °C</p>
        </div>);
    }
}

export default IlFait;
