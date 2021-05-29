import React from 'react'

export const defaultConfigs = {
  sidebarScrollHeight: 0,
  updateSidebarScrollHeight: () => {},
  updateChineseState: () => {},

  tabbarFixed: false,
  updateTabbarFixed: () => {},

  customTheme: {},
  updateCustomTheme: () => {},
  onThemeChange: () => {},
}

export const ConfigContext = React.createContext(defaultConfigs)

export const useConfigs = () => React.useContext(ConfigContext)
