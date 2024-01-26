import React, { createContext, useMemo, useState, useContext } from 'react';
import noop from 'lodash/noop';

type MenuIds = 'first' | 'second' | 'last';
type Menu = { id: MenuIds; title: string };

type SelectedMenu = {
  selectedMenu: { id: MenuIds };
};

//! Добрий день. Я не зовсім розібрався із цим завданням і не зовсім його зрозумів. Зробив редагування які ви вказали але з'явилися помилки

const MenuSelectedContext = createContext<SelectedMenu>({
  //! Помилка в selectedMenu: Property 'id' is missing in type 'SelectedMenu' but required in type '{ id: MenuIds; }'.ts(2741) 4.tsx(8, 19): 'id' is declared here. 4.tsx(8, 3): The expected type comes from property 'selectedMenu' which is declared here on type 'SelectedMenu'
  selectedMenu: {} as SelectedMenu,
});

type MenuAction = {
  onSelectedMenu: (menu: { id: MenuIds }) => void;
};

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

type PropsProvider = {
  children: React.ReactNode;
};

function MenuProvider({ children }: PropsProvider) {
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>(
    {} as SelectedMenu
  );

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    //! Помилка в обох value= (Type '{ onSelectedMenu: React.Dispatch<React.SetStateAction<SelectedMenu>>; }' is not assignable to type 'MenuAction'. Types of property 'onSelectedMenu' are incompatible. Type 'Dispatch<SetStateAction<SelectedMenu>>' is not assignable to type '(menu: { id: MenuIds; }) => void'. Types of parameters 'value' and 'menu' are incompatible. Type '{ id: MenuIds; }' is not assignable to type 'SetStateAction<SelectedMenu>'.ts(2322))
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

type PropsMenu = {
  menus: Menu[];
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map(menu => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title}{' '}
          {selectedMenu.id === menu.id ? 'Selected' : 'Not selected'}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: 'first',
      title: 'first',
    },
    {
      id: 'second',
      title: 'second',
    },
    {
      id: 'last',
      title: 'last',
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}
