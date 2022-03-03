import styles from '../styles/Rent.module.css'
import Calendar from 'react-calendar'
import { createRef, RefObject, useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css'
import numWords from 'num-words'
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import ImageUploading from "react-images-uploading";
import { MdClose } from 'react-icons/md';
import ReactToPdf from 'react-to-pdf'
import { Card, Button, TextField, Caption } from 'ui-neumorphism'
import 'ui-neumorphism/dist/index.css'
import { isMobile } from 'react-device-detect';


const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const Receipt = () => {

    const [beginDateVal, setBeginDateVal] = useState(new Date());
    const [endDateVal, setEndDateVal] = useState(new Date());
    const [beginDatePanel, setBeginDatePanel] = useState(false);
    const [endDatePanel, setEndDatePanel] = useState(false);
    const [tenantName, setTenantName] = useState("");
    const [rent, setRent] = useState("");
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [address3, setAddress3] = useState('');
    const [address4, setAddress4] = useState('');
    const [address5, setAddress5] = useState('');
    const [images, setImages] = useState([]);
    const [pan, setPan] = useState('');
    const [printView, setPrintView] = useState(false);
    const ref = createRef() as RefObject<HTMLDivElement>;

    useEffect(()=>{

    })

    const onBeginDateChange = (val: any)=>{
        console.log(val)
        setBeginDateVal(val);
        setBeginDatePanel(false);
        setEndDatePanel(false);
    }

    const onEndDateChange = (val: any)=>{
        setEndDateVal(val);
        setBeginDatePanel(false);
        setEndDatePanel(false);
    }


    const toggleBeginDate = ()=>{
        setEndDatePanel(false);
        setBeginDatePanel(!beginDatePanel);
    }

    const toggleEndDate = ()=>{
        setBeginDatePanel(false);
        setEndDatePanel(!endDatePanel);
    }

    const getDateFormat = (val: any)=>{
        let day = val.getDate();
        let month = val.getMonth()+1;
        let year = val.getFullYear();
        return day+"/"+month+"/"+year;
    }

    const getMonthFormat = (val: any)=>{
        let month = val.getMonth();
        let year = val.getFullYear();
        return monthMap[month]+" "+year;
    }

    const onRentChange = (val: any)=> {
        setRent(val)
    }

    const onRentEdit = (val: any)=> {
        setRent('')
    }

    const onTenantNameChange = (val: any)=> {
        setTenantName(val)
    }

    const onTenantNameEdit = (val: any)=> {
        setTenantName('')
    }

    const onImageChange = (imageList: any, addUpdateIndex: any)=>{
        setImages(imageList);
    }

    const confirmCalled = () =>{
        setPrintView(true);
    }
    const resetCalled = () =>{
        setBeginDateVal(new Date());
        setEndDateVal(new Date());
        setTenantName("Enter tenant name");
        setRent("Enter rent");
        setAddress1('');
        setAddress2('');
        setAddress3('');
        setAddress4('');
        setAddress5('');
        setImages([]);
        setPan('');
    }

    const backCalled = () =>{
        setPrintView(false);
    }

    if(!isMobile || printView){
    return (
        <>
        <div className={styles.containerStyle}>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'800px', minWidth:'800px', padding:'2rem'}} ref={ref}>
            <h1> RENT RECEIPT</h1>
            <div style={{marginTop:'2rem', width:'100%'}}>
                <div className={styles.rowStyle}>
                    <div>Received a sum of Rs.</div>
                    <div style={{ width:'80%', borderBottom: '1px solid black', paddingLeft:'1em', paddingRight:'3rem'}}>
                    <EditText value={rent} style={{ margin:0, padding:0, minHeight:'1rem'}} onChange={onRentChange} onEditMode={onRentEdit}/>
                    </div> 
                    <div>P.M (in words </div>
                    <div style={{width:'100%', borderBottom: '1px solid black'}}></div>
                </div>
                <div className={styles.rowStyle}>
                    <div style={{width:'100%', borderBottom: '1px solid black', textTransform:'capitalize', paddingLeft:'1rem'}}>{numWords(parseInt(rent))} {numWords(parseInt(rent)).length >0 ? 'only' : ''}</div>
                    <span>)</span>
                </div>
                <div className={styles.rowStyle}>
                    <div>from Mr./Ms/Mrs.</div>
                    <div style={{width:'100%', borderBottom: '1px solid black', paddingLeft:'1rem'}}>
                        <EditText value={tenantName} onChange={onTenantNameChange} onEditMode={onTenantNameEdit} style={{padding:0, margin:0, minHeight:'1em'}}/>
                    </div>
                    <div>towards rent </div>
                </div>
                <div className={styles.rowStyle}>
                    <div>of the premises as mentioned in the below month of</div>
                    <div className={styles.blankStyle}>
                        <div style={{display:'flex', width:'100%'}}>
                            <div style={{position:'relative', width:'70px', border:'1px'}}>
                                {beginDatePanel && <div style={{position:'absolute', zIndex:9}}>
                                    <Calendar value={beginDateVal} onChange={onBeginDateChange}/>
                                </div>}
                                <div className={styles.dateField} onClick={toggleBeginDate}>{getMonthFormat(beginDateVal)}</div>
                            </div>
                            <div style={{position:'relative', width:'50px'}}>
                            <div style={{paddingLeft:'1rem', paddingRight:'1rem'}}>-</div>
                            </div>
                            <div style={{position:'relative', width:'70px'}}>
                                {endDatePanel && <div style={{position:'absolute', zIndex:9}}><Calendar value={endDateVal} onChange={onEndDateChange}/></div>}
                                <div className={styles.dateField} onClick={toggleEndDate}>{getMonthFormat(endDateVal)}</div>
                            </div>
                        </div>
                    </div> 
                </div>
                <div className={styles.rowStyle}>
                    <div>( From</div>
                    <div className={styles.blankStyle} style={{width:'fit-content', paddingRight:'2rem'}}>{getDateFormat(beginDateVal)}</div> 
                    <div>To</div>
                    <div className={styles.blankStyle} style={{width:'fit-content', paddingRight:'2rem'}} >{getDateFormat(endDateVal)}</div> 
                    <div>)</div>
                </div>
            </div>
            <div style={{display:'flex', justifyContent:'space-between', width:'100%', marginTop:'3rem', marginBottom:'3rem'}}>
                <div style={{display:'flex', flexDirection:'column', width:'50%', alignItems:'center'}}>
                    <div style={{margin:'1rem'}}>Address of the House <br/>for which Rent is paid</div>
                    <div style={{width:'100%', borderBottom: '1px solid black', paddingTop:'0.5em'}}>
                        <EditText value={address1} onChange={(val : any)=>setAddress1(val)} style={{padding:0, margin:0, paddingLeft:'1rem', minHeight:'1em'}}/>
                    </div>
                    <div style={{width:'100%', borderBottom: '1px solid black', paddingTop:'0.5em'}}>
                        <EditText value={address2} onChange={(val : any)=>setAddress2(val)}  style={{padding:0, margin:0, paddingLeft:'1rem', minHeight:'1em'}}/>
                    </div>
                    <div style={{width:'100%', borderBottom: '1px solid black', paddingTop:'0.5em'}}>
                        <EditText value={address3} onChange={(val : any)=>setAddress3(val)} style={{padding:0, margin:0,  paddingLeft:'1rem', minHeight:'1em'}}/>
                    </div>
                    <div style={{width:'100%', borderBottom: '1px solid black', paddingTop:'0.5em'}}>
                        <EditText value={address4} onChange={(val : any)=>setAddress4(val)} style={{padding:0, margin:0,  paddingLeft:'1rem', minHeight:'1em'}}/>
                    </div>
                    <div style={{width:'100%', borderBottom: '1px solid black', paddingTop:'0.5em'}}>
                        <EditText value={address5} onChange={(val : any)=>setAddress5(val)} style={{padding:0, margin:0,  paddingLeft:'1rem', minHeight:'1em'}}/>
                    </div>
                </div>
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between'}}>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center', width:'100%'}}>
                        <div style={{width:'100%', marginTop:'2rem', marginBottom:'0.5rem', borderStyle:'solid', borderWidth:'1px', textTransform: 'uppercase', letterSpacing:'4px'}}>
                        <EditText value={pan} onChange={(val : any)=>setPan(val)} style={{padding:0, margin:0, textAlign:'center'}}/>
                        </div>
                        <div>PAN of Landlord</div>
                    </div>
                    <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
                    <ImageUploading
                        value={images}
                        onChange={onImageChange}
                        maxNumber={1}
                        dataURLKey="data_url"
                    >
                        {({
                            imageList,
                            onImageUpload,
                            onImageRemoveAll,
                            onImageUpdate,
                            onImageRemove,
                            isDragging,
                            dragProps
                        }) => (
                        <div className="upload__image-wrapper">
                            {imageList.length > 0 && imageList.map((image, index) => (
                            <div key={index} style={{display:'flex', alignItems:'center'}} >
                                <img src={image["data_url"]} alt="" style={{width:'180px'}} />
                                {!printView && <div className={styles.removeSignBtn} onClick={() => onImageRemove(index)}><MdClose/></div>}
                            </div>
                            ))}
                            {!imageList.length && !printView && <div className="btn btn-back" style={{margin:'1rem'}} onClick={onImageUpload} >Upload Sign</div>}
                        </div>
                        )}
                    </ImageUploading>
                    <div>Signature of the Landlord</div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div style={{display:'flex' , justifyContent:'center',}} >
            {!printView && <div className="btn btn-back" style={{margin:'1rem'}} onClick={confirmCalled}>Confirm</div>}
            {!printView && <div className="btn btn-back" style={{margin:'1rem'}} onClick={resetCalled}>Reset</div>}
            {printView &&  <ReactToPdf targetRef={ref} filename="rent-receipt.pdf">
                {({toPdf} : any) => (
                    <div className="btn btn-back" style={{margin:'1rem'}} onClick={toPdf}>Print</div>
                )}
            </ReactToPdf>}
            {printView && <div className="btn btn-back" style={{margin:'1rem'}} onClick={backCalled}>Back</div>}
        </div>
    </>);
    } else {
    return (
        <Card style={{display:'flex', flexDirection:'column', alignItems:'center', height:'100%', padding:'2rem', minHeight:'100vh'}}>
            <TextField placeholder='Tenant Name' value={tenantName} onChange={(e:any)=>onTenantNameChange(e.value)} width={270}/>
            <TextField placeholder='Monthly Rent' value={rent} onChange={(e:any)=>onRentChange(e.value)} width={270}/>
            <TextField placeholder='PAN of Landlord' value={pan} onChange={(e:any)=>setPan(e.value)} width={270}/>
            <div className={styles.mobileRow}>
            <div className={styles.mobileCol}>
                <Caption>From</Caption>
                <div style={{position:'relative'}}>
                    {beginDatePanel && <div style={{position:'absolute', zIndex:9, marginLeft:'-2rem'}}><Calendar value={beginDateVal} onChange={onBeginDateChange}/></div>}
                    <Button  onClick={toggleBeginDate}>{getMonthFormat(beginDateVal)}</Button>
                </div>
            </div>
            <div className={styles.mobileCol}>
            <Caption>To</Caption>
                <div style={{position:'relative'}}>
                    {endDatePanel && <div style={{position:'absolute', zIndex:9, marginLeft:'-11rem'}}><Calendar value={endDateVal} onChange={onEndDateChange}/></div>}
                    <Button  onClick={toggleEndDate}>{getMonthFormat(endDateVal)}</Button>
                </div>
            </div>
            </div>
            <br/>
            <div style={{display:'flex', flexDirection:'column', width:'100%'}}>
                <div>Address</div> 
                <TextField value={address1} placeholder='Flat No.' onChange={(e:any)=>setAddress1(e.value)} width={270}/>
                <TextField value={address2} placeholder='Building/Society' onChange={(e:any)=>setAddress2(e.value)} width={270}/>
                <TextField value={address3} placeholder='Locality' onChange={(e:any)=>setAddress3(e.value)} width={270}/>
                <TextField value={address4} placeholder='District/State' onChange={(e:any)=>setAddress4(e.value)} width={270}/>
            </div>
            <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
            <ImageUploading
                value={images}
                onChange={onImageChange}
                maxNumber={1}
                dataURLKey="data_url"
            >
                {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps
                }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    {imageList.length > 0 && imageList.map((image, index) => (
                    <div key={index} style={{display:'flex', alignItems:'center'}} >
                        <img src={image["data_url"]} alt="" style={{width:'180px'}} />
                        {!printView && <div className={styles.removeSignBtn} onClick={() => onImageRemove(index)}><MdClose/></div>}
                    </div>
                    ))}
                    {!imageList.length && !printView && <Button style={{margin:'1rem'}} onClick={onImageUpload} >Upload Sign</Button>}
                </div>
                )}
            </ImageUploading>
            <br/>
            </div>
            <div style={{display:'flex' , justifyContent:'center'}} >
            {!printView && <Button onClick={confirmCalled} style={{marginRight:'1rem'}}>Confirm</Button>}
            {!printView && <Button onClick={resetCalled}>Reset</Button>}
            </div>
        </Card>
    );
    }
}

export default Receipt;