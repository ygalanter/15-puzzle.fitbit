function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">15 Puzzle Settings</Text>}>
      </Section>
      <Section
        title={<Text>Background Color</Text>}>
        <ColorSelect
          settingsKey="backgroundColor"
          colors={[
            {color: 'darkblue'},
            {color: 'navy'},
            {color: 'black'},
            {color: 'darkred'},
            {color: 'darkslategray'},
            {color: 'firebrick'},
            {color: 'indigo'},
            {color: 'brown'},
            {color: 'darkmagenta'},
            {color: 'olive'},
            {color: 'darkviolet'},
            {color: 'goldenrod'},
            
            {color: 'aqua'},
            {color: 'aquamarine'},
            {color: 'chartreuse'},
            {color: 'floralwhite'},
            {color: 'gold'},
            {color: 'greenyellow'},
            {color: 'khaki'},
            {color: 'lawngreen'},
            {color: 'yellow'},
            {color: 'red'},
            {color: 'thistle'},
            {color: 'pink'}
          ]}
        />
      </Section>
        
      <Section
        title={<Text>Tile Color</Text>}>
        <ColorSelect
          settingsKey="tileColor"
          colors={[
            {color: 'darkblue'},
            {color: 'navy'},
            {color: 'black'},
            {color: 'darkred'},
            {color: 'darkslategray'},
            {color: 'firebrick'},
            {color: 'indigo'},
            {color: 'brown'},
            {color: 'darkmagenta'},
            {color: 'olive'},
            {color: 'darkviolet'},
            {color: 'goldenrod'},
            
            {color: 'aqua'},
            {color: 'aquamarine'},
            {color: 'chartreuse'},
            {color: 'floralwhite'},
            {color: 'gold'},
            {color: 'greenyellow'},
            {color: 'khaki'},
            {color: 'lawngreen'},
            {color: 'yellow'},
            {color: 'red'},
            {color: 'thistle'},
            {color: 'pink'}
                     ]}
        />
      </Section>        
      
      <Section
        title={<Text>Number Color</Text>}>
        <ColorSelect
          settingsKey="numberColor"
          colors={[
            {color: 'darkblue'},
            {color: 'navy'},
            {color: 'black'},
            {color: 'darkred'},
            {color: 'darkslategray'},
            {color: 'firebrick'},
            {color: 'indigo'},
            {color: 'brown'},
            {color: 'darkmagenta'},
            {color: 'olive'},
            {color: 'darkviolet'},
            {color: 'goldenrod'},
            
            {color: 'aqua'},
            {color: 'aquamarine'},
            {color: 'chartreuse'},
            {color: 'floralwhite'},
            {color: 'gold'},
            {color: 'greenyellow'},
            {color: 'khaki'},
            {color: 'lawngreen'},
            {color: 'yellow'},
            {color: 'red'},
            {color: 'thistle'},
            {color: 'pink'}
                     ]}
        />
      </Section>        
      
      
    </Page>
  );
}

registerSettingsPage(mySettings);