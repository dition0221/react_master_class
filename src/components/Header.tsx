import styled from "styled-components";
import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";

/* Styled */
const Nav = styled(motion.nav)`
  width: 100%;
  height: 68px;
  padding: 20px 60px;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: white;
  z-index: 1;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 92.5px;
  margin-right: 45px;
  fill: ${(props) => props.theme.red};
  cursor: pointer;
`;

const Items = styled.ul`
  display: flex;
  align-items: center;
`;

const Item = styled.li`
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
  transition: color 0.3s ease-in-out;
`;

const Circle = styled(motion.span)`
  position: absolute;
  display: block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  svg {
    width: 25px;
    height: 25px;
    fill: white;
    cursor: pointer;
    z-index: 1;
  }
`;

const Input = styled(motion.input)`
  width: 275px;
  height: 36px;
  background-color: black;
  border: 1px solid white;
  color: white;
  font-size: 16px;
  padding: 5px;
  padding-left: 40px;
  padding-right: 30px;
  transform-origin: right center;
  position: absolute;
  right: 0;
`;

const ErrorMessage = styled.span`
  position: absolute;
  bottom: -35px;
  left: -240px;
  background-color: #485460;
  color: #ff3f34;
  font-size: 16px;
  font-weight: 900;
  text-decoration: underline;
  font-style: italic;
`;

const DeleteBtn = styled.svg`
  position: absolute;
  right: 5px;
`;

/* Variants */
const navVariants = {
  top: {
    background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0))",
    transition: { duration: 0.5 },
  },
  scroll: {
    background: "linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))",
    transition: { duration: 0.2 },
  },
};

const logoVariants = {
  normal: {
    fillOpacity: 1,
  },
  active: {
    fillOpacity: [1, 0, 1],
    transition: { repeat: Infinity },
  },
};

/* Interface */
interface IForm {
  keyword: string;
}

/* Component */
export default function Header() {
  const goToTopPage = () => window.scrollTo({ top: 0 }); // <Circle /> Bug 해결

  // Search form
  const {
    register,
    handleSubmit,
    setFocus,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IForm>();
  const navigate = useNavigate();
  const onSubmit = ({ keyword }: IForm) =>
    navigate(`/search?keyword=${keyword}`);
  const isInputValue = watch("keyword")?.trim();

  // Search animation (Click search icon)
  const [searchOpen, setSearchOpen] = useState(false);
  const inputAnimation = useAnimation();
  const toggleSearch = useCallback(() => {
    if (searchOpen) {
      // to Close
      inputAnimation.start({ scaleX: 0 });
      setValue("keyword", "");
    } else {
      // to Open
      inputAnimation.start({ scaleX: 1 });
      setFocus("keyword");
    }
    setSearchOpen((prev) => !prev);
  }, [searchOpen, inputAnimation, setFocus, setValue]);

  // Closing search animation (Click outside)
  const searchRef = useRef<HTMLFormElement>(null);
  const deleteBtnRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchOpen &&
        searchRef.current &&
        !searchRef.current.contains(event.target as HTMLFormElement)
      )
        toggleSearch();
    };
    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [searchOpen, toggleSearch]);

  // Menu Animation
  const homeMatch = useMatch("/");
  const modalBoxMatch = useMatch("/movies/:id");
  const tvMatch = useMatch("/tv");
  const searchMatch = useMatch("/search");

  // Scroll Animation
  const { scrollY } = useScroll();
  const navAnimation = useAnimation();
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) navAnimation.start("scroll");
    else navAnimation.start("top");
  });

  return (
    <Nav variants={navVariants} initial="top" animate={navAnimation}>
      <Col>
        <Link to="/" onClick={goToTopPage}>
          <Logo
            variants={logoVariants}
            whileHover="active"
            initial="normal"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 276.742"
          >
            <motion.path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>
        <Items>
          <Item>
            <Link to="/" onClick={goToTopPage}>
              홈{(homeMatch || modalBoxMatch) && <Circle layoutId="circle" />}
            </Link>
          </Item>
          <Item>
            <Link to="/tv" onClick={goToTopPage}>
              TV쇼
              {tvMatch && <Circle layoutId="circle" />}
            </Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search ref={searchRef} onSubmit={handleSubmit(onSubmit)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -240 : 0 }}
            transition={{ type: "linear" }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </motion.svg>
          <Input
            initial={{ scaleX: 0 }}
            animate={inputAnimation}
            transition={{ type: "tween" }}
            placeholder="제목, 사람, 장르"
            {...register("keyword", {
              required: "최소 2글자 이상이어야 합니다.",
              minLength: {
                value: 2,
                message: "최소 2글자 이상이어야 합니다.",
              },
              maxLength: {
                value: 15,
                message: "최대 15글자 이하이어야 합니다.",
              },
            })}
          />
          {searchOpen && isInputValue && (
            <DeleteBtn
              ref={deleteBtnRef}
              onClick={(e) => {
                e.stopPropagation();
                setValue("keyword", "");
              }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
            </DeleteBtn>
          )}
          {searchMatch && !searchOpen && <Circle layoutId="circle" />}
          {searchOpen && <ErrorMessage>{errors.keyword?.message}</ErrorMessage>}
        </Search>
      </Col>
    </Nav>
  );
}
