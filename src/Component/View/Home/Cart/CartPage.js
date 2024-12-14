import React, { useEffect, useRef, useState } from 'react';
import CartList from './CartList';
import PaymentPopup from './PaymentPopup';
import './Payment.css';
import './Cart.css';
import CouponPopup from './CouponPopup';
import { useParams } from 'react-router-dom';
import axiosConfig from '../../../Config/AxiosConfig';
import { useForm } from 'react-hook-form';
import DeliveryAddressPopup from './DeliveryAddressPopup';
import CouponStoragePopup from './CouponStoragePopup';
import axios from 'axios';
import CustomAlert from '../../../Config/CustomAlert';
const CartPage = () => {
    const {cartId} = useParams();
    const [isOpenPayment,setIsOpentPayment] = useState(false);
    const [isOpenCoupon,setIsOpentCoupon] = useState(false);
    const {register,handleSubmit, reset , watch} = useForm();
    const [cart,setCart] = useState([]);
    const [cartItem,setCartItem] = useState([]);
    const [totalQuantity,setTotalQuantity] = useState(0);
    const [totalPrice,setTotalPrice] = useState(0);
    const [quantity,setQuantity] = useState();
    const [couponId,setCouponId] = useState();
    const [coupons,setCoupons] = useState([]);
    const [checkCoupon,setCheckCoupon] = useState(null);
    const [finalToTalPrice,setFinalToTalPrice] = useState(0);
    const [discountAmount,setDiscountAmount] = useState(0);
    const [isOpenDelivery,setIsOpentDelivery] = useState(false);
    const [user,setUser] = useState();
    const [points,setPoints] = useState([]);
    const [isUsePoint,setIsUsePoint] = useState(false);

    const baseReturnUrl = window.location.origin;


    const [deliveryByUserId,setDeliveryByUserId] = useState([]);

    const [alert,setAlert] = useState(null);
    const userName = localStorage.getItem('userNameLogin');
    const codeInputRef = useRef();
    const [couponByCode,setCouponByCode] = useState(null);
    const [isOpentCouponStorage,setIsOpentCouponStorage] = useState(false);
    const [couponStorageByUserId,setCouponStorageByUserId] = useState([]);
    const [paginationCouponState, setPaginationCouponState] = useState({
        pageCurrent : 0,
        pageSize : 4,
        sortOrder : 'asc',
        sortBy : 'couponStorageId', 
        totalPage : ''
    })

    const [addressState,setAddressState] = useState({
        provinceData : [], 
        districtData : [], 
        wardData : [],  
        shipServiceData : [],
        provinceChoosed : [], 
        districtChoosed : [], 
        wardChoosed : [],
        shipServiceChoosed : '',
        houseNumber : '',
        shipFee : '', 
        leadTime : '',
        fullAddress : '', 
        couponId : '',
        discountAmount : ''
    })

    const fecthGetCartByCartId = async () => {
      try {
        const userName = localStorage.getItem('userNameLogin');
        const resUser = await axiosConfig.get(`/user/getByUserName/${userName}`);
        setUser(resUser.data.data);
        const resCartByCartId = await axiosConfig.get(`/cart/${cartId}`);
        const resToTalQuantity = await axiosConfig.get(`/cart/${cartId}/totalQuantity`);
        const resToTalPrice = await axiosConfig.get(`/cart/${cartId}/totalPrice`);
        const cartItem = Object.values(resCartByCartId.data.data.items);
        const resUserPoint = await axiosConfig.get(`/userPoint/${userName}`);
        setCartItem(cartItem);
        setTotalQuantity(resToTalQuantity.data.data);
        setTotalPrice(resToTalPrice.data.data);
        console.log(resUserPoint.data.data);
        setPoints(resUserPoint.data.data);
      } catch (error) {
        console.log('error in fectGetCartByCartId',error);
      }
    }

    const [paginationState, setPaginationState] = useState({
        pageCurrent :0,
        pageSize : 3,
        sortOrder :'asc',
        sortBy : 'deliveryAddressId'
    })
    const fetchDeliveryAddressByUserName = async () => {
        try {
            const resDeliveryAddressByUserName = await axiosConfig.get(`/deliveryAddress`,
                {
                    params : {
                        pageCurrent : paginationState.pageCurrent,
                        pageSize : paginationState.pageSize,
                        sortOrder : paginationState.sortOrder,
                        sortBy : paginationState.sortBy
                    }
                }
            )
            console.log(resDeliveryAddressByUserName.data.data);
            setDeliveryByUserId(resDeliveryAddressByUserName.data.data.content);
        } catch (error) {
            console.error('error in fetchDeliveryAddressByUserName',error);
        }
    }


    const handleChangeAddressDataState = (name, value) => {
        setAddressState((prev) => (
            {
                ...prev ,
                [name] : value
            }
        )
    )
    }

    const handleOpenDelivery = () => {
        fetchProvinces();
        setIsOpentDelivery(!isOpenDelivery);
    }
    const fetchProvinces = async () => {
        try {
            const resProvinces = await axiosConfig.post(`/ship/getProvince`);      
            const parsedData = JSON.parse(resProvinces.data.data);
            handleChangeAddressDataState('provinceData',parsedData.data);
        } catch (error) {
            console.error('error in fetch Provinces',error);
        }
    }

    const hanldeDistrictByProvinceId = async (provinceId) => {
        console.log(provinceId);
        handleChangeAddressDataState('provinceChoosed',addressState.provinceData.find(item => item.ProvinceID === Number(provinceId)));
        try {
            const resDistricts = await axiosConfig.post(`/ship/getDistrict/${provinceId}`);
            const parseDitricts = JSON.parse(resDistricts.data.data);
            console.log(parseDitricts.data);
            handleChangeAddressDataState('districtData',parseDitricts.data);
        } catch (error) {
            console.error('erorr in getDistrictByProvinceId',error);
        }
    }
    const hanldeWardByDistrictId = async (districtId) => {
        console.log(districtId);
        console.log(addressState.districtData);
        handleChangeAddressDataState('districtChoosed',addressState.districtData.find(item => item.DistrictID === Number(districtId)));
        try {
            const resWards =  await axiosConfig.post(`/ship/getWard/${districtId}`);
            const parseWards = JSON.parse(resWards.data.data);
            console.log(parseWards.data);
            handleChangeAddressDataState('wardData',parseWards.data);
            handleGetShipService(districtId);
        } catch (error) {
            console.error('error in getWardByDistrictId',error);
        }
    }

    const handleGetShipService = async (districtId) => {
        console.log(addressState.districtChoosed);
        try {
            const resShipService = await axiosConfig.post(`/ship/getShipService/${districtId}`);
            const parseShipService = JSON.parse(resShipService.data.data);
            handleChangeAddressDataState('shipServiceData',parseShipService.data);
        } catch (error) {
            console.error('error in handle Get Ship Service',error);
        }
    }

    const handleGetFee = async(service_type_id) => {
        console.log(addressState);
        handleChangeAddressDataState('shipServiceChoosed',addressState.shipServiceData.find(item => item.service_type_id === Number(service_type_id)));
        try {
            const resFee =  await axiosConfig.post(`/ship/getFee/${addressState.districtChoosed.DistrictID}/${service_type_id}/${addressState.wardChoosed.WardCode}`);
            console.log(resFee.data.data.leadTimeData);
            const parseFee = JSON.parse(resFee.data.data.feeData);
            console.log(parseFee.data);
            handleChangeAddressDataState('leadTime',resFee.data.data.leadTimeData);
            handleChangeAddressDataState('shipFee' , parseFee.data.service_fee);
        } catch (error) {
            console.error('error in handle Get Fee',error);
        }
    }

    const handleGetDeliveryById = async (deliveryAddressId) => {
        console.log(deliveryAddressId);
        try {
            const resDeliveryById = await axiosConfig.get(`/deliveryAddress/getById/${deliveryAddressId}`);
            const deliveryData = resDeliveryById.data.data;
            console.log(deliveryData);
            if (deliveryData) {
                const provinces = JSON.parse( (await axiosConfig.post(`/ship/getProvince`)).data.data).data;
                console.log(provinces);
                const provincesChoosed = provinces.find(item => item.ProvinceID === Number(deliveryData.provinceId));

                const districts = JSON.parse( (await axiosConfig.post(`/ship/getDistrict/${deliveryData.provinceId}`)).data.data).data;
                const districtChoosed = districts.find(item => item.DistrictID === Number(deliveryData.districtId))
                console.log(districts);
                
                
                const wards = JSON.parse((await axiosConfig.post(`/ship/getWard/${deliveryData.districtId}`)).data.data).data;
                const wardChoosed = wards.find(item => item.WardCode === deliveryData.wardCode);
                console.log(wards);

                const shipServices = JSON.parse((await axiosConfig.post(`/ship/getShipService/${deliveryData.districtId}`)).data.data).data;
                setAddressState((prev) => ({
                    ...prev,
                    provinceData : provinces,
                    districtData : districts,
                    wardData : wards,
                    provinceChoosed : provincesChoosed,
                    districtChoosed : districtChoosed,
                    wardChoosed : wardChoosed,
                    shipServiceData : shipServices,
                    houseNumber: deliveryData.houseNumber,
                    fullAddress: deliveryData.fullAddress,
                    shipFee :'',
                    leadTime : ''
                }));
            }
        } catch (error) {
            console.error('Error in handleGetDeliveryById:', error);
        }
    };
    

    const handleAddressData = async() => {
        try {
            const fullAddress = addressState.houseNumber + ' ' + addressState.wardChoosed.WardName + ' ' +
               addressState.districtChoosed.DistrictName + ' - ' +addressState.provinceChoosed.ProvinceName;
               console.log(fullAddress);
               console.log(addressState.shipFee);
               console.log(addressState.leadTime);
               handleOpenDelivery();
        } catch (error) {
            console.error('error in handle address Data',error);
        }
    }


    const handleAddCartItem = async (delta, foodVaId) => {
        try {
        const resCart = await axiosConfig.post(`/cart/addCartItem/${cartId}/${foodVaId}/${delta}`);
        setCart(resCart.data.data);
        const cartItemNew = Object.values(resCart.data.data.items);
        const quantity = cartItem.find(item => item.foodVariation.foodVariationId === foodVaId).quantity;
        const quantityNew = cartItemNew.find(item => item.foodVariation.foodVariationId === foodVaId).quantity;
        console.log(quantity);
        console.log(quantityNew);
        if(quantity === quantityNew){
            console.log('asdfas')
            setAlert({type : 'error' , message : `Out of Stock! Stock is : ${ quantityNew} Item`});
        }
        } catch (error) {
        console.error('error in add CartItem',error);
        }
    }
    const removerCart = async (foodVaId) => {
        console.log(foodVaId);
        try {
            const removeCartItem = await axiosConfig.delete(`/cart/${cartId}/${foodVaId}`);
            if(removeCartItem.data.data !== null){
                setAlert({type : 'success', message : 'Remove Item Success'});
            }else {
                setAlert({type : 'error', message : 'Remove Item Failed!'});
            }
            console.log(removeCartItem);
            fecthGetCartByCartId();
        } catch (error) {
            console.error('error in remove CartItem',error);
        }
    }

    const hanldePayment = async (totalPrice,paymethod,deliveryAddress)=> {
        console.log(addressState.leadTime);
        console.log(addressState);
        if(addressState.leadTime === ''  || addressState.shipFee === ''){
            console.log('asdlkasd')
            setAlert({ type : 'error',message : 'Please Choose Ship Service!'});
            handlePaymentPopup();
            handleOpenDelivery();
            return ;
        }
        try {
            let resPaymentUrl;
            console.log(totalPrice);
            console.log(deliveryAddress);
       
            if(paymethod === "vnpay"){
                 resPaymentUrl= await axiosConfig.post(`/payment/byVnpay/${totalPrice}/${cartId}`,null,
                    {
                        params : 
                        { 
                            baseReturnUrl : baseReturnUrl,
                            couponId : addressState.couponId,
                            leadTime :addressState.leadTime,
                            shipFee : addressState.shipFee,
                            deliveryAddress : deliveryAddress
                        }
                    }
                );
            console.log(resPaymentUrl.data);
            }else if(paymethod === "paypal"){
                resPaymentUrl = await axiosConfig.post(`/payment/byPaypal/${totalPrice}/${cartId}`,null,
                    {
                        params : 
                        {
                            baseReturnUrl : baseReturnUrl,
                            couponId : addressState.couponId,
                            leadTime :addressState.leadTime,
                            shipFee : addressState.shipFee,
                            deliveryAddress : deliveryAddress
                        }
                    }
                )
                console.log(resPaymentUrl.data);
            }else if(paymethod === "stripe"){
                const data = cartItem.map((item) => {
                    return {
                        idPrice: item.foodVariation.food.priceId,
                        quantity:item.quantity
                    }
                })
                console.log(data);
                resPaymentUrl = await axiosConfig.post(`/payment/byStripe/${totalPrice}/${cartId}`,data,
                {
                    params : 
                    {
                        baseReturnUrl : baseReturnUrl ,
                        couponId : addressState.couponId,
                        leadTime :addressState.leadTime,
                        shipFee : addressState.shipFee,
                        deliveryAddress : deliveryAddress         
                    }
                }
                )
            }else if(paymethod === "momo"){
                console.log("momo");

                //console.log(user.username);
                const username = 'huongpham';
                resPaymentUrl = await axiosConfig.post(`/payment/byMomo/${totalPrice}/${cartId}/${username}`,null,
                {
                    params : 
                    {
                        baseReturnUrl : baseReturnUrl ,
                        couponId : addressState.couponId,
                        leadTime :addressState.leadTime,
                        shipFee : addressState.shipFee,
                        deliveryAddress : deliveryAddress
                    }
                }
                )
            }
            console.log(resPaymentUrl);
            if(resPaymentUrl){
                // Khi gửi yêu cầu thanh toán lên server, nó sẽ tạo ra 1 url thanh toán trả về
                // Chuyển vị trí của trang web đến theo đường dẫn 
                window.location.href= resPaymentUrl.data.data;
            } else {
                console.error('Payment URL is missing.');
            }
        } catch (error) {
            console.error("Error in Fetch Payment ", error);
        }
    }

    const handlePaymentPopup = async () => {
        setIsOpentPayment(!isOpenPayment);
    }

    
    const handelCheckCoupon = async (code) => {
        console.log(code);
        try {
            const resCheckCoupon = await axiosConfig.get(`/coupon/checkCoupon/${code}`);
            console.log(resCheckCoupon.data.data.data);
            if(resCheckCoupon.data.data.accept){
                setAlert({type : 'success',message : 'Use Coupon Success !'});
                codeInputRef.current= code;
                console.log(resCheckCoupon.data.data.data);
                setCouponByCode(resCheckCoupon.data.data.data);
                handleChangeAddressDataState('couponId',resCheckCoupon.data.data.data.couponId);
               // fetchCartByUserId();
               let discountAmount = resCheckCoupon?.data.data.data.discountPercent * totalPrice;
               console.log(discountAmount);
               if(discountAmount > resCheckCoupon?.data.data.data.maxDiscountAmount){
                   discountAmount = resCheckCoupon?.data.data.data.maxDiscountAmount;
               }
               handleChangeAddressDataState('discountAmount',discountAmount);
                handleOpenCouponStorage();
            }else {
                setAlert({type : 'error', message: `${resCheckCoupon.data.data.message}` })
            }
        } catch (error) {
            console.error('error in handleCheck Coupon',error);
        }
    }

    const fetchGetCouponStorageByUserName = async () => {
        try {
            const resCouponsByUserName = await axiosConfig.get(`/couponStorage/${userName}/yourCoupon`);
            setCouponStorageByUserId(resCouponsByUserName.data.data);
        } catch (error) {
            console.error('error in fetchGetCouponStorageByUserId',error);
        }
    }

    const handleOpenCouponStorage = () => {
        fetchGetCouponStorageByUserName()  ;
        setIsOpentCouponStorage(!isOpentCouponStorage);
    }

    const handleRemoveCoupon = () => {
        setCouponByCode(null);
        handleChangeAddressDataState('discountAmount',0);
        fecthGetCartByCartId();
    }
    // const handleCouponPopup = async () => {
    //     setIsOpentCoupon(!isOpenCoupon);
    //     const username = 'huongpham';
    //     try {
    //         const resCouponsByUserName = await axiosConfig.get(`/couponStorage/${username}/yourCoupon`);
    //         console.log(resCouponsByUserName.data);
    //         setCoupons(resCouponsByUserName.data.data);
    //     } catch (error) {
    //         console.error('error in fetch handleCouponPopup', error);
    //     }
    // }

    // const handleAddCouponToCart = async () => {
    //     try {
    //         const resCart = await addCouponToCart(userId,codeInputRef.current);
    //         console.log(resCart.data);
    //         if(resCart.data.data){
    //             setAlert({type : 'success', message : 'Add Coupon To Cart Success !'})
    //             fetchCartByUserId();
    //         }
    //     } catch (error) {
    //         console.error('error in handle Add Coupon To Cart',error);
    //     }
    // }

    // const handleRemoveCoupon = async() => {
    //     try {
    //         const resCart = await removeCouponToCart(userId,couponByCode.code);
    //         if(resCart.data.data ){
    //             setAlert({type : 'success', message : 'Remove Coupon To Cart Success !'})
    //             setCouponByCode(null);
    //             fetchCartByUserId();
    //         }
    //         console.log(resCart.data);
    //     } catch (error) {
    //         console.error('error in remove Coupon To Cart',error);
    //     }
    // }

    
    // const handleUseCoupon = async (code) => {
    //     console.log(code);
    //     try {
    //         const resCheckCouponByCode = await axiosConfig.get(`/coupon/checkCoupon/${code}`);
    //         console.log(resCheckCouponByCode.data.data.data.couponId);
    //         setIsOpentCoupon(!isOpenCoupon);
    //         setCheckCoupon(resCheckCouponByCode.data.data);
    //         setCouponId(resCheckCouponByCode.data.data.data.couponId);
            // let discountAmount = resCheckCouponByCode?.data.data.data.discountPercent * totalPrice;
            // if(discountAmount > resCheckCouponByCode?.data.data.data.maxDiscountAmount){
            //     discountAmount = resCheckCouponByCode?.data.data.data.maxDiscountAmount;
            // }
    //         setDiscountAmount(discountAmount);
    //         setFinalToTalPrice(totalPrice - discountAmount);
    //         console.log(totalPrice - discountAmount);
    //     } catch (error) {
    //         console.error('error in handleUseCoupon',error);
    //     }
    // }

  
    const handleUsePoint = (point) => {
        const pointValue = Number(point); // Chuyển đổi điểm thành số
        setIsUsePoint((prevIsUsePoint) => {
            const isUse = !prevIsUsePoint;
    
            // Tính toán giá trị mới của totalPrice dựa trên isUse
            setTotalPrice((prevTotalPrice) => {
                if (isUse) {
                    // Nếu sử dụng điểm, trừ điểm từ totalPrice
                    return prevTotalPrice - pointValue;
                } else {
                    // Nếu không sử dụng điểm, cộng lại điểm vào totalPrice
                    return prevTotalPrice + pointValue;
                }
            });
            return isUse;
        });
    };
    
    useEffect (() => {
        fecthGetCartByCartId();
        fetchDeliveryAddressByUserName();
        console.log(addressState);
    },[cartId,cart,...Object.values(addressState)]);
    
    return (
        <div>

           {
            alert && (
                <CustomAlert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )
           }
            <CartList
            handlePaymentPopup ={handlePaymentPopup}
            handleOpenCouponStorage = {handleOpenCouponStorage}
            cartItem = {cartItem}
            totalQuantity = {totalQuantity}
            totalPrice = {totalPrice}
            handleAddCartItem = {handleAddCartItem}
            removerCart = {removerCart}
            handleOpenDelivery = {handleOpenDelivery}
            shipFee = {addressState.shipFee}
            points = {points}
            handleUsePoint = {handleUsePoint}
            isUsePoint = {isUsePoint}
            addressState = {addressState}
            couponByCode = {couponByCode}
            handleRemoveCoupon = {handleRemoveCoupon}
             />

            <PaymentPopup
            isOpenPayment={isOpenPayment}
            handlePaymentPopup={handlePaymentPopup}
            totalPrice = {finalToTalPrice > 0 ? finalToTalPrice+addressState.shipFee : totalPrice+addressState.shipFee }
            hanldePayment={hanldePayment}
            user = {user}
            deliveryAddress ={addressState.fullAddress !== "" ? addressState.fullAddress : user?.address}
             />
              <CouponStoragePopup 
                isOpenCouponStorage={isOpentCouponStorage}
                handleOpenCouponStorage = {handleOpenCouponStorage}
                couponStorageByUserId = {couponStorageByUserId}
                handelCheckCoupon = {handelCheckCoupon}
                codeInputRef = {codeInputRef}
            />
              <DeliveryAddressPopup
                isOpenDelivery={isOpenDelivery}
                handleOpenDelivery={handleOpenDelivery}
                deliveryByUserId= {deliveryByUserId}
                addressState = {addressState}
                handleChangeAddressDataState = {handleChangeAddressDataState}
                hanldeDistrictByProvinceId= {hanldeDistrictByProvinceId}
                hanldeWardByDistrictId = {hanldeWardByDistrictId}
                handleGetFee = {handleGetFee}
                handleAddressData ={handleAddressData}
                handleGetDeliveryById= {handleGetDeliveryById}
             />
        </div>
    );
};

export default CartPage;