import { useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom"
import { toast } from "react-toastify"
import { AppActions, AuthenticateActions } from "src/actions"
import configService from "src/configService"

export default function useLanguageAndPageFuncSupplier(componentId, push400, getFunction, getLanguageResource) {
    const { replace } = useHistory()
        , _isMounted = useRef()
        , dispatch = useDispatch()
        , [data, setData] = useState({})
        , [reload, setReload] = useState()
        , [isLoading, setIsLoading] = useState(true)
        , { i18n } = useTranslation()
        , authData = useSelector(state => state.User.userInfor)

    useEffect(() => {
        _isMounted.current = true
        return () => {
            _isMounted.current = false
        }
    }, [])

    useEffect(() => {
        if (_isMounted.current) {
            const load = async () => {
                const response = await AppActions.GetUserAuthResourceByAppPageIdc(configService.CLIENT_ID,
                    componentId, i18n.language, getFunction, getLanguageResource)(dispatch)
                if (_isMounted.current) {
                    if (response)
                        if (response.status === 200) {
                            setData(response.data)
                        } else if (response.status === 500) {
                            return setReload(Math.random())
                        }
                        else toast.error(response.message)

                    if (push400 && !response?.data?.IsAccessible === true && !authData[AuthenticateActions.IsAdmin]) {
                        return replace("/400")
                    }
                    setIsLoading(false)
                }
            }

            load()
        }
    }, [authData, componentId, dispatch, getFunction, getLanguageResource, i18n, push400, reload, replace])

    return {
        func: data.FunctionObj,
        page: data.ArrPage,
        isLoading,
        i18n,
        setReload,
    }
}