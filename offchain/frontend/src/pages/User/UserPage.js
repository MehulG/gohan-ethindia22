import React from "react"
import Navbar from "../../components/NavBar/Navbar"
import { NotifCard } from "../../components/NotifCard/NotifCard"
import { useState, useEffect } from "react"
import { useMoralis } from "react-moralis"

const PushAPI = require("@pushprotocol/restapi")

const UserPage = () => {
    const { isWeb3Enabled, account } = useMoralis()
    const [notifs, setNotifs] = useState([])

    const Alerts = () => {
        useEffect(() => {
            const fetchNotifs = async (
                chainId = "8001",
                public_key = "0x5E4EE2aA55C20cae19eb8592aC8216264F9813dE",
                environment = "staging"
            ) => {
                try {
                    const notifications = await PushAPI.user.getFeeds({
                        user: `eip155:${chainId}:${public_key}`, // user address in CAIP
                        env: `${environment}`,
                    })

                    console.log(notifications)
                } catch (error) {
                    console.log("There was some issue getting the Notifications. Error: ", error)
                    return
                }
            }

            fetchNotifs("8001", account, "staging")
            const interval = setInterval(() => fetchNotifs(), 2000)
            return () => {
                clearInterval(interval)
            }
        }, [])
    }

    Alerts()

    return (
        <>
            <Navbar />
            <h1>Pending Requests</h1>
            <div className="notifStack">
                {isWeb3Enabled ? (
                    notifs.map((notif, index) => {
                        return (
                            <NotifCard
                                notifTitle={notif.title}
                                notifMessage={notif.message}
                                key={index}
                            />
                        )
                    })
                ) : (
                    <h1>Connect wallet</h1>
                )}
            </div>
        </>
    )
}

export default UserPage
