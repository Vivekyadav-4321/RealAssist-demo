import printerIcon from '../assets/printer-icon.svg'
import shieldIcon from '../assets/shieldIcon.svg'
import '../assets/style.css'
import '../assets/chart'
import ApexCharts from "apexcharts";
import { useEffect } from "react";
import { Margin, usePDF } from "react-to-pdf";



export function Chart() {

    useEffect(() => {
        fetch('https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv').then((res) => res.json()).then((res) => {
            let seriesData = []
            let xaxisData = []
            res.data.forEach(element => {
                seriesData.push(element.Robbery)
                xaxisData.push(element.data_year)

            })

            const newData = {
                chart: {
                    type: 'line'
                },
                series: [{
                    name: 'crime',
                    data: seriesData
                }],
                xaxis: {
                    categories: xaxisData
                }
            }

            let chart = new ApexCharts(document.querySelector("#chart"), newData);
            chart.render();
            setTimeout(() => {

                chart.dataURI({ scale: 5 }).then(({ imgURI }) => {
                    console.log(imgURI);
                    localStorage.setItem("chartImage", imgURI)
                })
            }, 1000);
        })

    }, [])




    const { toPDF, targetRef } = usePDF({
        filename: "Robbery.pdf",
        page: { margin: Margin.MEDIUM ,format: 'A4'},
        resolution: 2
    })

    return (
        <>
            <div className='container'>
                <div ref={targetRef} className='main-container'>
                    <div className='section-title'>
                        <img src={shieldIcon} alt='shield icon'></img>
                        <span className='section-heading'>
                            Crime
                        </span>
                        <span className='section-title-hr'>
                        </span>
                    </div>
                    <div className='chart-container'>
                        <span>
                        Robbery
                        </span>
                        <div id='chart' >
                        </div>
                    </div>
                    <div className='footer'>
                        <span className='footer-date'>
                            Report Generated on October 11, 2023
                        </span>
                        <span className='footer-page-indicator'>
                            RealAssist Property Report | Page 1 of 1
                        </span>
                    </div>
                </div>

                <div className='download-button-container'>
                    <button onClick={toPDF}>
                        <img src={printerIcon} alt='print icon'></img> Print
                    </button>
                </div>

            </div >

        </>


    )


}