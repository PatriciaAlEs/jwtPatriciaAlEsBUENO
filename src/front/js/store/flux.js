const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      user: null,
      authError: null,
    },
    actions: {

      signupUser: async (email, password) => {
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/api/signup`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Error del servidor:", errorData);
            setStore({
              authError: errorData.msg || "Error al registrar usuario",
            });
            return { error: errorData.msg || "Error al registrar usuario" };
          }
          const data = await res.json();
          setStore({ user: data.user, authError: null });

          return data;
        } catch (error) {
          console.error("Error al registrar usuario:", error);
          setStore({ authError: error.message });
          return { error: error.message };
        }
      },

      loginUser: async (email, password) => {
        try {
          const resp = await fetch(`${process.env.BACKEND_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!resp.ok) {
            const errorData = await resp.json();
            setStore({ authError: errorData.msg });
            return { error: errorData.msg };
          }

          const data = await resp.json();
          sessionStorage.setItem("accessToken", data.access_token);
          setStore({ user: data.user, authError: null });
          return data;
        } catch (error) {
          setStore({ authError: "Error durante el inicio de sesión" });
          return { error: "Error durante el inicio de sesión" };
        }
      },
	  
      logoutUser: () => {
        sessionStorage.removeItem("accessToken");
        setStore({ user: null, authError: null });
        console.log("cerrando la sesión...");
      },
    },
  };
};

export default getState;
