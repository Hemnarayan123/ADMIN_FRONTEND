import React, {useCallback, useEffect, useState} from 'react'
import AxiosHelper from '../../helper/AxiosHelper';
import StatisticsWidget from './StatisticsWidget';


const Dashboard = () => {

    const [data, setData] = useState({
        blogsCount: 0,
        enquiriesCount: 0,
    })
    
    const getData = useCallback(async () => {
        const { data } = await AxiosHelper.getData(`admin/dashboard`);
        if (data.status) {
            setData(data.data);
        } else {
            // 
        }
    }, [])
    
    useEffect(() => { getData() }, [getData])
    return (
        <div>
            <div className="card">
                <div className="card-body" style={{ minHeight: 200 }}>
                    <div className="row row-cols-1 row-cols-xxl-2 row-cols-lg-2 row-cols-md-2">
                        <div className="col">
                            <StatisticsWidget variant={'success'} cardTitle={'Number of Blogs'} stats={`${data.blogsCount}`} />
                        </div>

                        <div className="col">
                            <StatisticsWidget variant={'danger'} cardTitle={'Number of Enquiries'} stats={`${data.enquiriesCount}`} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard