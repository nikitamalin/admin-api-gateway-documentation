import React from "react";
import Link from "next/link";
import { useIframeContext } from "@/components/Context/iframe";
import { useState, useEffect } from "react";
import mixpanel from "mixpanel-browser";
import { useSession } from "next-auth/react";
export default function Home() {
  const headingText = "text-2xl mt-5 font-medium";
  const subHeadingText = "text-xl font-medium";
  const subText = "text-lg";
  const subHeading = "indent-6 flex flex-col";
  const subSubHeading = "indent-12 flex flex-col";
  const bulletSubSubHeading = "indent-12 text-sm";
  const subSubSubheading = "indent-16";
  const bulletSubSubSubHeading = "indent-16 text-sm";

  const { data: session } = useSession();
  const [email, setEmail] = useState("");

  let setUrl = useIframeContext().setUrl;

  function setTheURL(url: string) {
    setUrl("api/protectedPage?anchor=#" + url);
    mixpanel.init("e8d932180ae57787b3c2fd743194abdb");
    mixpanel.track("API function view", {
      anchor: url,
      email: email
    });
  }

  const linkClass = "cursor-pointer underline mr-auto";

  useEffect(() => {
    const fetchSession = async () => {
      if (session && session.user && session.user.email) {
        setEmail(session.user.email);
      }
    };

    fetchSession();
  }, [session]);

  useEffect(() => {
    if (email) {
      mixpanel.init("e8d932180ae57787b3c2fd743194abdb");
      mixpanel.track("Page View", {
        pageName: "Home Page",
        email: email
      });
    }
  }, [email]);

  const handleDownload = async () => {
    const res = await fetch("/api/protectedDumpFile");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "CarIQAPI.json";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="flex flex-col max-w-[800px] w-[80vw] my-10 mx-auto ">
      <h1 className="mx-auto text-4xl">Car IQ Documentation</h1>
      <div className={`${subText} flex flex-col`}>
        <span className="mt-5">
          Click any of the following queries/mutations to explore their fields
          and types.
        </span>
        <h3 className={`${headingText}`}>Authentication</h3>
        <div className={`${subSubHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-userLogin")}
          >
            userLogin
          </Link>
        </div>

        <h3 className={`${headingText}`}>Vehicle/Tolling</h3>
        <div className={`${subHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-vehicleRegistrationDataUpdate")}
          >
            vehicleRegistrationDataUpdate
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; Update Registration data on a vehicle which enables it for
            tolling
          </span>
        </div>

        <h3 className={`${headingText}`}>Service Location ETL</h3>
        <div className={`${subHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-syncServiceLocationEnv")}
          >
            syncServiceLocationEnv
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; Sync all stations from ETL to core_services for a given
            environment
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-syncServiceLocations")}
          >
            syncServiceLocations
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; Sync a given list of stations from ETL to core_services
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-updateStation")}
          >
            updateStation
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; Update data on a station
          </span>
        </div>

        <h3 className={`${headingText}`}>Card on File</h3>
        <div className={`${subSubHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-coFCardDelete")}
          >
            coFCardDelete
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-p97Tokenization")}
          >
            p97Tokenization
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-vehiclePaymentMethodUpdate")}
          >
            vehiclePaymentMethodUpdate
          </Link>
        </div>

        <h3 className={`${headingText}`}>I2C</h3>
        <div className={`${subSubHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-accountCreditLimitSet")}
          >
            accountCreditLimitSet
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-makePayment")}
          >
            makePayment
          </Link>
        </div>

        <h3 className={`${headingText}`}>Organization</h3>
        <div className={`${subSubHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-organizationUpdate")}
          >
            organizationUpdate
          </Link>
        </div>
      </div>
    </div>
  );
}
