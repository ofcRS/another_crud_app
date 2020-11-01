import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';

import { Styled } from './Sidebar.styles';

import { mainMenuRoutes } from 'routes';
import { useStore } from 'store';
import { Burger } from '../Burger';

export const Sidebar = observer(() => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [sidebarPosition, setSidebarPosition] = useState(-300);

    const { ui } = useStore();

    //Открывает сайдбар драг'н'дропом
    useEffect(() => {
        if (!ui.sidebarOpen) {
            const moveAt = (event: MouseEvent) => {
                event.preventDefault();
                if (event.pageX <= 300) {
                    setSidebarPosition(event.pageX - 300);
                }
            };

            const onMouseUp = (event: MouseEvent) => {
                document.removeEventListener('mousemove', moveAt);
                if (event.clientX <= 150) {
                    setSidebarPosition(-300);
                } else {
                    setSidebarPosition(0);
                }
            };

            const listener = (event: MouseEvent) => {
                event.preventDefault();
                document.addEventListener('mousemove', moveAt);
                document.addEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mousedown', listener);
            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('mouseup', onMouseUp);
            };
        }
    }, [ui.sidebarOpen]);

    return (
        <Styled.Sidebar
            style={{
                transform: `translateX(${sidebarPosition}px)`,
            }}
            ref={sidebarRef}
        >
            <Styled.SidebarHeader>
                <Burger />
            </Styled.SidebarHeader>
            {mainMenuRoutes.map(({ path, label }) => (
                <Styled.NavLink key={path} to={path}>
                    {label}
                </Styled.NavLink>
            ))}
        </Styled.Sidebar>
    );
});
