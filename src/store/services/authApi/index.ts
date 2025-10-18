export static class AuthService { 
async LoginPage(){
  (email: stry {
    const response = await fetch(
      "https://server.bizengo.com/api/auth/login",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }
    );

    console.log("Response status:", response.status);
  const data = await response.json();
  console.log("Response data:", data);

  if (
    response.ok &&
    (data.status === "success" || data.success || response.status === 200)
  ) {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("RSEmail", email);
      if (data.access_token) {
        sessionStorage.setItem("RSToken", data.access_token);
      }
      if (data.user) {
        sessionStorage.setItem("RSUser", JSON.stringify(data.user));
      }
    }

    closeNotification();

    const userRole = data.user?.role;

    if (userRole && userRole.toLowerCase() === "admin") {
      if (data.access_token && typeof window !== "undefined") {
        localStorage.setItem("adminToken", data.access_token);
        localStorage.setItem("isAdminLoggedIn", "true");
      }

      setTimeout(() => {
        showNotification(
          "success",
          "Admin Access Granted!",
          `Welcome Administrator! Redirecting to admin panel...`
        );

        setEmail("");
        setPassword("");

        setTimeout(() => {
          router.push("/Adminstration");
        }, 1500);
      }, 500);
      return;
    }

    try {
      const profileResponse = await fetch(
        "https://server.bizengo.com/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();

        if (typeof window !== "undefined" && profileData) {
          const existingUser = JSON.parse(
            sessionStorage.getItem("RSUser") || "{}"
          );
          sessionStorage.setItem(
            "RSUser",
            JSON.stringify({ ...existingUser, ...profileData })
          );
        }

        const profileRole = profileData?.role || userRole;

        if (profileRole && profileRole.toLowerCase() === "vendor") {
          setTimeout(() => {
            showNotification(
              "error",
              "Vendor Access Required",
              "You are a vendor. Please use the vendor login portal to access your account."
            );

            setEmail("");
            setPassword("");

            setTimeout(() => {
              router.push("/vendor/auth");
            }, 3000);
          }, 500);
        } else {
          setTimeout(() => {
            showNotification(
              "success",
              "Welcome Back!",
              profileData?.business_name
                ? `Good to see you again, ${profileData.business_name}! Redirecting to your dashboard...`
                : "Successfully signed in to your account. Redirecting to marketplace..."
            );

            setEmail("");
            setPassword("");

            setTimeout(() => {
              try {
                const redirectUrl =
                  sessionStorage.getItem("redirectUrl") || "/marketplace";
                sessionStorage.removeItem("redirectUrl");
                window.location.href = redirectUrl;
              } catch (error) {
                console.error("Redirect error:", error);
                window.location.href = "/marketplace";
              }
            }, 1500);
          }, 500);
        }
      } else {
        console.error("Failed to fetch user profile");

        setTimeout(() => {
          showNotification(
            "success",
            "Login Successful!",
            data.message || "Welcome back! Redirecting to your dashboard..."
          );

          setEmail("");
          setPassword("");

          setTimeout(() => {
            try {
              const redirectUrl =
                sessionStorage.getItem("redirectUrl") || "/marketplace";
              sessionStorage.removeItem("redirectUrl");
              window.location.href = redirectUrl;
            } catch (error) {
              console.error("Redirect error:", error);
              window.location.href = "/marketplace";
            }
          }, 1500);
        }, 500);
      }
    } catch (profileError) {
      console.error("Error fetching user profile:", profileError);

      setTimeout(() => {
        showNotification(
          "success",
          "Login Successful!",
          data.message || "Welcome back! Redirecting to your dashboard..."
        );

        setEmail("");
        setPassword("");

        setTimeout(() => {
          try {
            const redirectUrl =
              sessionStorage.getItem("redirectUrl") || "/marketplace";
            sessionStorage.removeItem("redirectUrl");
            window.location.href = redirectUrl;
          } catch (error) {
            console.error("Redirect error:", error);
            window.location.href = "/marketplace";
          }
        }, 1500);
      }, 500);
    }
  } else {
    let errorMessage = "Invalid email or password. Please try again.";
    let errorTitle = "Login Failed";

    if (data.message) {
      errorMessage = data.message;
    } else if (data.error) {
      errorMessage = data.error;
    } else if (data.errors && Array.isArray(data.errors)) {
      errorMessage = data.errors.join(", ");
    }

    if (response.status === 400) {
      errorTitle = "Invalid Request";
    } else if (response.status === 401) {
      errorTitle = "Authentication Failed";
      errorMessage =
        "Invalid email or password. Please check your credentials.";
    } else if (response.status === 403) {
      errorTitle = "Access Denied";
      errorMessage = "Your account may be suspended or not verified.";
    } else if (response.status === 404) {
      errorTitle = "Account Not Found";
      errorMessage = "No account found with this email address.";
    } else if (response.status === 429) {
      errorTitle = "Too Many Attempts";
      errorMessage = "Too many login attempts. Please try again later.";
    } else if (response.status === 500) {
      errorTitle = "Server Error";
      errorMessage =
        "Our servers are experiencing issues. Please try again later.";
    }

    closeNotification();

    setTimeout(() => {
      showNotification("error", errorTitle, errorMessage);
    }, 500);
  }
} catch (error: any) {
  console.error("Login error:", error);

  let errorMessage = "Failed to sign in. Please try again.";
  let errorTitle = "Login Failed";

  if (error.name === "TypeError" && error.message.includes("fetch")) {
    errorTitle = "Connection Error";
    errorMessage =
      "Unable to connect to our servers. Please check your internet connection and try again.";
  } else if (error.message.includes("timeout")) {
    errorTitle = "Request Timeout";
    errorMessage =
      "The request took too long to complete. Please check your connection and try again.";
  } else if (error.message) {
    errorMessage = error.message;
  }

  closeNotification();

  setTimeout(() => {
    showNotification("error", errorTitle, errorMessage);
  }, 500);
} finally {
  setIsLoading(false);
}
}