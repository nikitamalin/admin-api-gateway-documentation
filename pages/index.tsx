import React from "react";
import Link from "next/link";
import { useIframeContext } from "@/components/Context/iframe";
import { useState, useEffect } from "react";

export default function Home() {
  const headingText = "text-2xl mt-5 font-medium";
  const subHeadingText = "text-xl font-medium";
  const subText = "text-lg";
  const subHeading = "indent-6 flex flex-col";
  const subSubHeading = "indent-12 flex flex-col";
  const bulletSubSubHeading = "indent-12 text-sm";
  const subSubSubheading = "indent-16";
  const bulletSubSubSubHeading = "indent-16 text-sm";

  let setUrl = useIframeContext().setUrl;

  function setTheURL(url: string) {
    setUrl("api/protectedPage?anchor=#" + url);
  }

  const linkClass = "cursor-pointer hover:text-orange mr-auto";

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
        <h2 className="mt-10 text-xl">Get started with Insomnia!</h2>
        <div className="ml-6 mt-2 flex flex-col">
          <span>
            1.&nbsp;
            <Link
              href="https://insomnia.rest/download"
              target="_blank"
              className="text-orange border-b border-orange leading-6 hover:border-none hover:text-orangeHover cursor-pointer"
            >
              Download Insomnia
            </Link>
          </span>
          <span>
            2.&nbsp;
            <button
              onClick={handleDownload}
              className="text-orange border-b border-orange leading-6 hover:border-none hover:text-orangeHover cursor-pointer"
            >
              Download Car IQ API Dump File
            </button>
          </span>
          <span>
            3.&nbsp;
            <Link
              href="https://www.loom.com/share/5c588a379557438e964556131cc4d029"
              target="_blank"
              className="text-orange border-b border-orange leading-6 hover:border-none hover:text-orangeHover cursor-pointer"
            >
              Watch Walkthrough Video
            </Link>
          </span>
        </div>
        <span className="mt-5 ">
          Check out the&nbsp;
          <Link
            href="/setup"
            className="text-orange border-b border-orange leading-6 hover:border-none hover:text-orangeHover cursor-pointer"
          >
            setup docs
          </Link>
        </span>
        <span className="mt-5">
          Click any of the following queries/mutations to explore their fields
          and types.
        </span>
        <h2 className={`${headingText}`}>Authentication</h2>
        <div className={`${subHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-userLogin")}
          >
            userLogin
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; gives you access token which can be used as a Bearer token
            for requests.
          </span>
        </div>
        <h2 className={`${headingText}`}>Vehicle Fleet Management</h2>
        <div className={`${subHeading}`}>
          <h3 className={`${subHeadingText}`}>Single Vehicles</h3>
          <div className={`${subSubHeading}`}>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-vehicleCreate")}
            >
              vehicleCreate
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("query-vehicle")}
            >
              vehicle
            </Link>
            <span className={`${bulletSubSubSubHeading}`}>
              &bull; get a vehicle
            </span>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-vehicleUpdate")}
            >
              vehicleUpdate
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("query-vehiclesFilter")}
            >
              vehiclesFilter
            </Link>
            <span className={`${bulletSubSubSubHeading}`}>
              &bull; search across all vehicles in your organization
            </span>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("query-vehiclesFilterByLocation")}
            >
              vehiclesFilterByLocation
            </Link>
          </div>
          <h3 className={`${subHeadingText}`}>Vehicle Groups</h3>
          <div className={`${subSubHeading}`}>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-vehicleGroupCreate")}
            >
              vehicleGroupCreate
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("query-vehicleGroup")}
            >
              vehicleGroup
            </Link>
            <span className={`${bulletSubSubSubHeading}`}>
              &bull; get vehicle group
            </span>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-vehicleGroupUpdate")}
            >
              vehicleGroupUpdate
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-vehicleGroupDelete")}
            >
              vehicleGroupDelete
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("query-vehicleGroupsFilter")}
            >
              vehicleGroupsFilter
            </Link>
            <span className={`${bulletSubSubSubHeading}`}>
              &bull; filter on vehicle groups in your organization
            </span>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() =>
                setTheURL("mutation-vehicleGroupSpendRestrictionsSet")
              }
            >
              vehicleGroupSpendRestrictionsSet
            </Link>
            <span className={`${bulletSubSubSubHeading}`}>
              &bull; set restriction on spending such as amount per day, amount
              per transactions, and at what times and days of week.
            </span>
          </div>
          <h3 className={`${subHeadingText}`}>Vehicle Group Offline Mode</h3>
          <div className={`${subSubHeading}`}>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("query-riskRuleGet")}
            >
              riskRuleGet
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("query-riskRulesList")}
            >
              riskRulesList
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-riskRuleCreate")}
            >
              riskRuleCreate
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-riskRuleUpdate")}
            >
              riskRuleUpdate
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-riskRuleDelete")}
            >
              riskRuleDelete
            </Link>
          </div>
          <h3 className={`${subHeadingText}`}> Vehicle Group Drivers</h3>
          <div className={`${subSubHeading}`}>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-vehicleGroupDriversAdd")}
            >
              vehicleGroupDriversAdd
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-vehicleGroupDriversRemove")}
            >
              vehicleGroupDriversRemove
            </Link>
          </div>
          <h3 className={`${subHeadingText}`}> Vehicle Group Vehicles</h3>
          <div className={`${subSubHeading}`}>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-vehicleGroupVehiclesAdd")}
            >
              vehicleGroupVehiclesAdd
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("mutation-vehicleGroupVehiclesRemove")}
            >
              vehicleGroupVehiclesRemove
            </Link>
            <Link
              className={`${linkClass}`}
              href="/documentation"
              onClick={() => setTheURL("query-vehicleGroup")}
            >
              vehicleGroup
            </Link>
          </div>
        </div>
        <h2 className={`${headingText}`}>User Management</h2>
        <div className={`${subHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-userCreate")}
          >
            userCreate
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-user")}
          >
            user
          </Link>
          <span className={`${bulletSubSubHeading}`}>&bull; get a user</span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-userUpdate")}
          >
            userUpdate
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-userOffboard")}
          >
            userOffboard
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; offboard a user, will be deleted in 7 days.
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-usersFilter")}
          >
            usersFilter
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; filter on users in your entity
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-userSetPassword")}
          >
            userSetPassword
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-userForgotPassword")}
          >
            userForgotPassword
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-userRefreshToken")}
          >
            userRefreshToken
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-userLoginOtpRequest")}
          >
            userLoginOtpRequest
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-userLoginOtpVerify")}
          >
            userLoginOtpVerify
          </Link>
        </div>
        <h2 className={`${headingText}`}>Pay App</h2>
        <div className={`${subHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-servicePay")}
          >
            servicePay
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; pay at a gas station with direct connect
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-ttpTokenization")}
          >
            ttpTokenization
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; provision a card for TTP
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-serviceLocationsFilter")}
          >
            serviceLocationsFilter
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; get a list of stations near you
          </span>
        </div>
        <h2 className={`${headingText}`}>Transactions</h2>
        <div className={`${subHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-transactionsFilter")}
          >
            transactionsFilter
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; get a list of transactions
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-transactionsStats")}
          >
            transactionsStats
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; get KPIs on all your transactions for a given entityId
          </span>
        </div>
        <h2 className={`${headingText}`}>Reporting/Invoicing</h2>
        <div className={`${subHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-transactionReportDownload")}
          >
            transactionReportDownload
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; download transaction report on an entity, vehicle group,
            vehicle, or a driver.
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-reportsDownload")}
          >
            reportsDownload
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; download a transactions report on after hours purchases, all
            transaction, transactions with premium fuel, validation exceptions
            on transactions, or a purchase exception.
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-driverReportDownload")}
          >
            driverReportDownload
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; download onboarded or offboarded drivers
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-creditStatementsList")}
          >
            creditStatementsList
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; get a list of your credit statements
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-creditPaymentsList")}
          >
            creditPaymentsList
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; get a list of payments for your credit account
          </span>
        </div>
        <h2 className={`${headingText}`}>Policy Management</h2>
        <div className={`${subHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-policyCreate")}
          >
            policyCreate
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-policyManage")}
          >
            policyManage
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; update and enable/disable policies.
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("mutation-policyDelete")}
          >
            policyDelete
          </Link>
        </div>
        <h2 className={`${headingText}`}>Entity</h2>
        <div className={`${subHeading}`}>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-entity")}
          >
            entity
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; get information on an entity
          </span>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-entitiesFilter")}
          >
            entitiesFilter
          </Link>
          <Link
            className={`${linkClass}`}
            href="/documentation"
            onClick={() => setTheURL("query-entityAccountInfo")}
          >
            entityAccountInfo
          </Link>
          <span className={`${bulletSubSubHeading}`}>
            &bull; information about the credit or ach account associated with
            this entity
          </span>
        </div>
      </div>
    </div>
  );
}
