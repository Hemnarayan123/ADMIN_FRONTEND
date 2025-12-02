import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logdedOutAdmin } from "../../../redux/admin/adminSlice";
import AxiosHelper from "../../../helper/AxiosHelper";
import { toast } from "react-toastify";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const { data } = await AxiosHelper.getData("admin/logout");

                if (data?.status) {
                    dispatch(logdedOutAdmin());
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                toast.error("Logout failed");
            }

            navigate("/admin/login");
        })();
    }, []);

    return null;
};


export default Logout