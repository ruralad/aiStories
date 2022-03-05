import sun from "../assets/sun.png";
import moon from "../assets/moon.png";
import infolight from "../assets/infolight.png";
import infodark from "../assets/infodark.png";

export default function TopBar(props) {
  const { theme, setTheme, setInfo } = props;
  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <div className="topbar">
      {theme === "light" && (
        <img src={moon} onClick={switchTheme} alt="switchtodark" />
      )}
      {theme === "dark" && (
        <img src={sun} onClick={switchTheme} alt="switchtolight" />
      )}
      <img
        src={theme === "light" ? infodark : infolight}
        onClick={() => {
          setInfo(true);
        }}
        alt="info"
      />
    </div>
  );
}
