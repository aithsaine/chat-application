import React, { useEffect, useState } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Card,
    IconButton,
} from "@material-tailwind/react";
import {
    CubeTransparentIcon,
    UserCircleIcon,
    CodeBracketSquareIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon,
} from "@heroicons/react/24/solid";
import ResponsiveNavLink from "./ResponsiveNavLink";
import axios from "axios";
// profile menu component
const profileMenuItems = [

    {
        label: "Profile",
        icon: UserCircleIcon,
        path: route("profile.edit"),
        methode: "get"

    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,
        path: route("welcome"),
        methode: "get"


    },
    {
        label: "Help",
        icon: LifebuoyIcon,
        path: route("welcome"),
        methode: "get"


    },
    {
        label: "Sign Out",
        icon: PowerIcon,
        path: route("logout"),
        methode: "post"


    },
];

function ProfileMenu({ filename }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const closeMenu = () => setIsMenuOpen(false);
    const [image, setImage] = useState("")
    useEffect(() => {
        const getPict = async () => {
            const response = await axios.get(`/storage/picture/${filename}`, {
                responseType: 'blob',
            })
            if (response.status == 200) {

                const blobUrl = URL.createObjectURL(response.data);
                setImage(blobUrl)
                console.log(response.data)
            }

        }
        getPict();

    }, [])
    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="top-left">
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto sticky-top"
                >
                    <img
                        id="pictureProfile"
                        alt="tania andrew"
                        className="   w-30 h-30"
                        src={image}
                        style={{ borderRadius: "100%" }}
                        width={40}
                        height={40}
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                            }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                {profileMenuItems.map((item, key) => {
                    const isLastItem = key === profileMenuItems.length - 1;
                    return (
                        <ResponsiveNavLink method={item.methode} href={item.path}>


                            <MenuItem
                                key={key}
                                onClick={closeMenu}
                                className={`flex items-center gap-2 rounded ${isLastItem
                                    ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                    : ""
                                    }`}
                            >
                                {
                                    React.createElement(item.icon, {
                                        className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                                        strokeWidth: 2,
                                    })
                                }
                                <Typography
                                    as="span"
                                    variant="small"
                                    className="font-normal"
                                    color={isLastItem ? "red" : "inherit"}
                                >
                                    {item.label}
                                </Typography>
                            </MenuItem>
                        </ResponsiveNavLink>

                    );
                })}
            </MenuList>
        </Menu >
    );
}

function NavListMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);


    return (
        <React.Fragment>
            <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
                <MenuHandler>
                    <Typography as="a" href="#" variant="small" className="font-normal">
                        <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
                            <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
                            Pages{" "}
                            <ChevronDownIcon
                                strokeWidth={2}
                                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </MenuItem>
                    </Typography>
                </MenuHandler>
                <MenuList className="hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid">
                    <Card
                        color="blue"
                        shadow={false}
                        variant="gradient"
                        className="col-span-3 grid h-full w-full place-items-center rounded-md"
                    >
                        <RocketLaunchIcon strokeWidth={1} className="h-28 w-28" />
                    </Card>

                </MenuList>
            </Menu>
            <MenuItem className="flex items-center gap-2 font-medium text-blue-gray-900 lg:hidden">
                <Square3Stack3DIcon className="h-[18px] w-[18px] text-blue-gray-500" />{" "}
                Pages{" "}
            </MenuItem>

        </React.Fragment>
    );
}

// nav list component
const navListItems = [
    {
        label: "Dashboard",
        path: route("welcome")

    },
    {
        label: "Blocks",
        path: route("welcome")
    },
    {
        label: "Docs",
        path: route("welcome")
    },
];

function NavList() {
    return (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
            <NavListMenu />
            {navListItems.map(({ label, icon }, key) => (
                <Typography
                    key={label}
                    as="a"
                    href="#"
                    variant="small"
                    color="gray"
                    className="font-medium text-blue-gray-500"
                >
                    <ResponsiveNavLink className="flex items-center justify-center gap-2 lg:rounded-full" href="/">
                        <span className="text-gray-900"> {label}</span>
                    </ResponsiveNavLink>
                </Typography>
            ))}
        </ul>
    );
}

export function Nav({ filename }) {
    const [isNavOpen, setIsNavOpen] = React.useState(false);

    const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setIsNavOpen(false),
        );
    }, []);

    return (
        <Navbar className="mx-auto my-0 max-w-screen-xl sticky top-0 z-50 p-2 lg:rounded-full lg:pl-6">
            <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">

                <div className="hidden lg:block">
                    <NavList />
                </div>
                <IconButton
                    size="sm"
                    color="black"
                    variant="text"
                    onClick={toggleIsNavOpen}
                    className="ml-autocflex items-center mr-2 lg:hidden"
                >
                    <Bars2Icon className="h-6 w-6" />
                </IconButton>

                <Button size="sm" variant="text">
                    <span>Log In</span>
                </Button>
                <ProfileMenu filename={filename} />
            </div>
            <MobileNav open={isNavOpen} className="overflow-scroll">
                <NavList />
            </MobileNav>
        </Navbar >
    );
}