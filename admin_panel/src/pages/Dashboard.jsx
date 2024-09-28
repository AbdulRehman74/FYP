import React from 'react';
import {CheckCircleOutlined,} from "@ant-design/icons";
import {FaClipboardCheck, FaDoorOpen, FaUsers, FaUserTie} from "react-icons/fa";
import {ComposableMap, Geographies, Geography, Marker} from "react-simple-maps";
import './Dashboard.css';

const markers = [
    {name: "Customer", coordinates: [-74.006, 40.7128]}, // New York City, USA
    {name: "Provider", coordinates: [-0.1276, 51.5074]}, // London, UK
    {name: "Customer", coordinates: [139.6917, 35.6895]}, // Tokyo, Japan
    {name: "Provider", coordinates: [116.4074, 39.9042]}, // Beijing, China
    {name: "Customer", coordinates: [77.1025, 28.7041]}, // New Delhi, India
    {name: "Provider", coordinates: [151.2093, -33.8688]}, // Sydney, Australia
    {name: "Customer", coordinates: [2.3522, 48.8566]}, // Paris, France
    {name: "Provider", coordinates: [13.4050, 52.5200]}, // Berlin, Germany
    {name: "Customer", coordinates: [-58.3816, -34.6037]}, // Buenos Aires, Argentina
    {name: "Provider", coordinates: [-43.1729, -22.9068]}, // Rio de Janeiro, Brazil
    {name: "Customer", coordinates: [12.4964, 41.9028]}, // Rome, Italy
    {name: "Provider", coordinates: [55.2708, 25.2048]}, // Dubai, UAE
    {name: "Customer", coordinates: [4.8357, 45.7640]}, // Lyon, France
    {name: "Provider", coordinates: [37.6173, 55.7558]}, // Moscow, Russia
    {name: "Customer", coordinates: [-157.8583, 21.3069]}, // Honolulu, USA
    {name: "Provider", coordinates: [174.7633, -36.8485]}, // Auckland, New Zealand
    {name: "Customer", coordinates: [-99.1332, 19.4326]}, // Mexico City, Mexico
    {name: "Provider", coordinates: [90.4125, 23.8103]}, // Dhaka, Bangladesh
    {name: "Customer", coordinates: [13.3614, 38.1157]}, // Palermo, Italy
    {name: "Provider", coordinates: [103.8198, 1.3521]}, // Singapore
    {name: "Customer", coordinates: [-0.1181, 51.4966]}, // Westminster, UK
    {name: "Provider", coordinates: [135.7681, 35.0116]}, // Kyoto, Japan
    {name: "Customer", coordinates: [12.4545, 41.9029]}, // Vatican City
    {name: "Provider", coordinates: [-122.4194, 37.7749]}, // San Francisco, USA
    {name: "Customer", coordinates: [30.5234, 50.4501]}, // Kyiv, Ukraine
    {name: "Provider", coordinates: [14.5058, 46.0569]}, // Ljubljana, Slovenia
    {name: "Customer", coordinates: [19.0402, 47.4979]}, // Budapest, Hungary
    {name: "Provider", coordinates: [24.7535, 59.4360]}, // Tallinn, Estonia
    {name: "Customer", coordinates: [44.5061, 40.1772]}, // Yerevan, Armenia
    {name: "Provider", coordinates: [-70.6483, -33.4489]}, // Santiago, Chile
    {name: "Customer", coordinates: [-80.1918, 25.7617]}, // Miami, USA
    {name: "Provider", coordinates: [28.9784, 41.0082]}, // Istanbul, Turkey
    {name: "Customer", coordinates: [19.0402, 47.4979]}, // Budapest, Hungary
    {name: "Provider", coordinates: [10.7522, 59.9139]}, // Oslo, Norway
    {name: "Customer", coordinates: [-3.7038, 40.4168]}, // Madrid, Spain
    {name: "Provider", coordinates: [25.2797, 54.6872]}, // Vilnius, Lithuania
    {name: "Customer", coordinates: [-77.0369, 38.9072]}, // Washington D.C., USA
    {name: "Provider", coordinates: [27.5615, 53.9045]}, // Minsk, Belarus
    {name: "Customer", coordinates: [144.9631, -37.8136]}, // Melbourne, Australia
    {name: "Provider", coordinates: [139.6503, 35.6762]}, // Yokohama, Japan
    {name: "Customer", coordinates: [-80.8431, 35.2271]}, // Charlotte, USA
    {name: "Provider", coordinates: [15.9819, 45.8150]}, // Zagreb, Croatia
    {name: "Customer", coordinates: [2.3333, 48.8628]}, // Paris, France
    {name: "Provider", coordinates: [105.851, 21.0285]}, // Hanoi, Vietnam
    {name: "Customer", coordinates: [39.1979, -6.7924]}, // Dar es Salaam, Tanzania
    {name: "Provider", coordinates: [13.4050, 52.5200]}, // Berlin, Germany
    // Additional 50 coordinates from Pakistan
    {name: "Customer", coordinates: [74.3587, 31.5204]}, // Lahore
    {name: "Provider", coordinates: [73.0479, 33.6844]}, // Islamabad
    {name: "Customer", coordinates: [67.0011, 24.8607]}, // Karachi
    {name: "Provider", coordinates: [71.5249, 30.1575]}, // Multan
    {name: "Customer", coordinates: [70.7179, 29.3987]}, // Bahawalpur
    {name: "Provider", coordinates: [68.3697, 25.3960]}, // Hyderabad
    {name: "Customer", coordinates: [74.1883, 31.4924]}, // Faisalabad
    {name: "Provider", coordinates: [74.4053, 32.0751]}, // Sialkot
    {name: "Customer", coordinates: [70.5799, 28.6536]}, // Rahim Yar Khan
    {name: "Provider", coordinates: [70.9044, 29.4916]}, // Dera Ghazi Khan
    {name: "Customer", coordinates: [71.3992, 32.9304]}, // Bhakkar
    {name: "Provider", coordinates: [68.3614, 27.7244]}, // Sukkur
    {name: "Customer", coordinates: [71.5785, 33.7141]}, // Bannu
    {name: "Provider", coordinates: [70.6291, 29.5153]}, // Rajanpur
    {name: "Customer", coordinates: [70.9037, 31.3074]}, // Layyah
    {name: "Provider", coordinates: [73.5517, 32.0826]}, // Jhelum
    {name: "Customer", coordinates: [71.5636, 30.2058]}, // Khanewal
    {name: "Provider", coordinates: [73.1583, 31.0907]}, // Okara
    {name: "Customer", coordinates: [68.3679, 25.3845]}, // Matiari
    {name: "Provider", coordinates: [67.8228, 25.0202]}, // Thatta
    {name: "Customer", coordinates: [74.2121, 31.4535]}, // Sheikhupura
    {name: "Provider", coordinates: [71.9363, 30.1984]}, // Lodhran
    {name: "Customer", coordinates: [71.3872, 29.8986]}, // Muzaffargarh
    {name: "Provider", coordinates: [68.2802, 24.7821]}, // Mirpur Khas
    {name: "Customer", coordinates: [72.8689, 31.4086]}, // Chiniot
    {name: "Provider", coordinates: [70.8771, 28.2055]}, // Larkana
    {name: "Customer", coordinates: [67.2734, 24.9530]}, // Gadani
    {name: "Provider", coordinates: [72.6527, 31.5630]}, // Toba Tek Singh
    {name: "Customer", coordinates: [73.1037, 31.6784]}, // Jaranwala
    {name: "Provider", coordinates: [73.1101, 31.7694]}, // Chak Jhumra
    {name: "Customer", coordinates: [70.9781, 32.6103]}, // Mianwali
    {name: "Provider", coordinates: [67.9197, 24.7298]}, // Hub
    {name: "Customer", coordinates: [68.8047, 25.9225]}, // Umerkot
    {name: "Provider", coordinates: [70.3153, 28.0050]}, // Khairpur
    {name: "Customer", coordinates: [73.6993, 32.0869]}, // Gujranwala
    {name: "Provider", coordinates: [71.4973, 33.5952]}, // Kohat
    {name: "Customer", coordinates: [71.8783, 30.7029]}, // Vehari
    {name: "Provider", coordinates: [73.3915, 31.4251]}, // Nankana Sahib
    {name: "Customer", coordinates: [73.4662, 30.3800]}, // Pakpattan
    {name: "Provider", coordinates: [71.2439, 30.9686]}, // Mailsi
    {name: "Customer", coordinates: [72.3532, 33.6017]}, // Fateh Jang
    {name: "Provider", coordinates: [68.3489, 26.5628]}, // Nawabshah
    {name: "Customer", coordinates: [69.1796, 25.3807]}, // Mirpur Bathoro
    {name: "Provider", coordinates: [71.0114, 30.1818]}, // Shujabad
    {name: "Customer", coordinates: [67.6163, 26.2332]}, // Dadu
    {name: "Provider", coordinates: [73.7333, 32.1759]}, // Kamoke
];
const Dashboard = () => {
    // return (
    //     <div className="dashboard-container">
    //         <div className="stat-card-container">
    //             <div className="stat-card">
    //                 <div className="icon-container">
    //                     {/* <UserOutlined className="icon" /> */}
    //                     <FaUsers className="icon"/>
    //
    //                 </div>
    //                 <div className="stat-content">
    //                     <div className="stat-label">Customers</div>
    //                     <div className="stat-number">500</div>
    //                 </div>
    //             </div>
    //             <div className="stat-card">
    //                 <div className="icon-container">
    //                     {/* <UserOutlined className="icon" /> */}
    //                     <FaUserTie className="icon"/>
    //
    //                 </div>
    //                 <div className="stat-content">
    //                     <div className="stat-label">Service Providers</div>
    //                     <div className="stat-number">150</div>
    //                 </div>
    //             </div>
    //             <div className="stat-card">
    //                 <div className="icon-container">
    //                     {/* <CheckCircleOutlined className="icon"  /> */}
    //                     <FaDoorOpen className="icon"/>
    //                 </div>
    //                 <div className="stat-content">
    //                     <div className="stat-label">Available</div>
    //                     <div className="stat-number">35</div>
    //                 </div>
    //             </div>
    //             <div className="stat-card">
    //                 <div className="icon-container">
    //                     {/* <SyncOutlined className="icon" spin /> */}
    //                     <FaClipboardCheck className="icon"/>
    //                 </div>
    //                 <div className="stat-content">
    //                     <div className="stat-label">Assigned</div>
    //                     <div className="stat-number">24</div>
    //                 </div>
    //             </div>
    //             <div className="stat-card">
    //                 <div className="icon-container">
    //                     <CheckCircleOutlined className="icon"/>
    //                     {/* <FaCheckSquare className="icon" /> */}
    //
    //                 </div>
    //                 <div className="stat-content">
    //                     <div className="stat-label">Completed</div>
    //                     <div className="stat-number">15</div>
    //                 </div>
    //             </div>
    //         </div>
    //         <ComposableMap projection="geoEqualEarth" className="world-map">
    //             <Geographies geography="/features.json">
    //                 {({geographies}) =>
    //                     geographies.map((geo) => (
    //                         <Geography key={geo.rsmKey} geography={geo}
    //                                    style={{
    //                                        default: {
    //                                            fill: "#9ba8c2",
    //                                            // fill: "#2a354d",
    //                                            // outline: "none",
    //                                        },
    //                                        hover: {
    //                                            // fill: "#CFD8DC",
    //                                            fill: "#2a354d",
    //                                            outline: "none",
    //                                        },
    //                                        pressed: {
    //                                            fill: "#FF5722",
    //                                            outline: "none",
    //                                        },
    //
    //                                    }}
    //                         />
    //                     ))
    //                 }
    //             </Geographies>
    //             {markers.map(({name, coordinates}) => (
    //                 <Marker key={name} coordinates={coordinates}>
    //                     <circle r={3} fill="#F53"/>
    //                     {/* <text textAnchor="middle" y={-10} style={{ fill: "" }}>
    //           {name}
    //         </text> */}
    //                 </Marker>
    //             ))}
    //         </ComposableMap>
    //     </div>
    // )
    return (
        <div className="dashboard-container">
            <div className="stat-card-container">
                <div className="stat-card">
                    <div className="icon-container">
                        <FaUsers className="icon" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Customers</div>
                        <div className="stat-number">500</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="icon-container">
                        <FaUserTie className="icon" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Service Providers</div>
                        <div className="stat-number">150</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="icon-container">
                        <FaDoorOpen className="icon" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Available</div>
                        <div className="stat-number">35</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="icon-container">
                        <FaClipboardCheck className="icon" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Assigned</div>
                        <div className="stat-number">24</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="icon-container">
                        <CheckCircleOutlined className="icon" />
                    </div>
                    <div className="stat-content">
                        <div className="stat-label">Completed</div>
                        <div className="stat-number">15</div>
                    </div>
                </div>
            </div>
            <ComposableMap projection="geoEqualEarth" className="world-map">
                <Geographies geography="/features.json">
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    default: { fill: "#9ba8c2", outline: "none" },
                                    hover: { fill: "#2a354d", outline: "none" },
                                    pressed: { fill: "#FF5722", outline: "none" },
                                }}
                            />
                        ))
                    }
                </Geographies>
                {markers.map(({ name, coordinates }, index) => (
                    <Marker key={index} coordinates={coordinates}>
                        <circle r={3} fill="#F53" />
                    </Marker>
                ))}
            </ComposableMap>
        </div>
    );
};

export default Dashboard;
