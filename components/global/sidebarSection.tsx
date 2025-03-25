import axios from "axios"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { IconType } from "react-icons"
import { FaChevronRight, FaPlus } from "react-icons/fa"
import { FaChevronDown } from "react-icons/fa"
import { Spinner } from "../ui/spinner"
import { CompanyPopUp } from "../popup/companyPopup"

type companyItemsType = {
    name: string;
    icons: IconType;
    route: string;
}

interface companyProps {
    item: companyItemsType
}

const companies = [
    {name: "symphony social"},
    {name: "axe digital"},
    {name: "OPEP CAPITAL"},
    {name: "Music Groupcasascakjbkjbjkb"}
]

export const SideBarSectionExtends:React.FC<companyProps> = ({
    item
}) => {
    const pathname = usePathname();
    const [loadind, setLoading] = useState<boolean>(false);
    const [active, setActive] = useState<boolean>(false);
    const [createCompany, setCreateCompany] = useState<boolean>(false);
    function fetchUserCompany () {
        setLoading(true);
        setActive(true);
        axios.get('').then(() => {
            //setLoading(false);
        })
    }
    return (
        <>
            <CompanyPopUp active={createCompany} setCreateCompany={setCreateCompany} />
            <div>
                <div className="py-2 px-4 transition duration-300 cursor-pointer text-sidebarText">
                    <div className={`flex items-center ${active ? 'text-btnColor' : 'text-sidebarText'}`}>
                            <div 
                                className="w-5 h-5 mr-4 rounded flex-center hover:text-sidebarText hover:bg-[#333]"
                                onClick={() => {
                                    fetchUserCompany()
                                    if (active) {
                                        setActive(false)
                                    }
                                }}
                            >
                                {active ? <FaChevronDown size={12} title={`${item.name}`}/> : <FaChevronRight size={12} title={`${item.name}`}/>}
                            </div>
                        <div className="w-1/2">
                            <p className="text-sm">{item.name}</p>
                        </div>
                        <div className="flex itens-center space-x-2">
                            <div className="w-5 h-5 rounded flex-center ml-4 hover:text-sidebarText hover:bg-[#333]"
                                  onClick={() => {
                                    setCreateCompany(true)
                                    setActive(false)
                                }}
                            >
                                <FaPlus size={12} title={`new ${item.name}`}/>
                            </div>
                        </div>
                    </div>
                    <div className={clsx('', {
                        "hidden": !active
                    })}>
                        {false && <Spinner className="w-[18px] p-0" bg="#fff" fill="#171515" />}
                        {companies.map((company, index) => (
                             <div key={index} className="rounded text-sm mt-4 hover:bg-sidebarText hover:text-gray-800">
                                <Link 
                                href={item.route} 
                                className="block  py-2 rounded "
                                onClick={() => sessionStorage.setItem('workspace', company.name)}>
                                    <ul className="w-full list-disc pl-8 overflow-hidden text-ellipsis whitespace-nowrap">
                                        <li className=""><p>{company.name}</p></li>
                                    </ul>
                                </Link>
                            </div>
                        ))}
                </div>
               </div>
            </div>
        </>
    )
}