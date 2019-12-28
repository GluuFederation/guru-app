import { useTicketState, useInfoState } from "../../state/hooks/state";
import { ShortUser, ShortCompany } from "../../state/types/profiles";
import { TicketOs } from "../../state/types/info";

const useValidators = () => {
  const {
    companyAssociation,
    createdBy,
    createdFor,
    issueType,
    category,
    gluuServer,
    os,
    osVersion,
    products,
    title,
    body
  } = useTicketState();
  const { categories, issueTypes, products: gluuProducts } = useInfoState();

  const isUserInCompany = async (
    user: ShortUser | null,
    company: ShortCompany | null
  ): Promise<boolean> => {
    // TODO: implement server side validation here
    return Promise.resolve(true);
  };

  const validateStep = async (step: number): Promise<string> => {
    switch (step) {
      case 1:
        if (!companyAssociation)
          return Promise.reject(Error("Please select a company"));
        break;
      case 2:
        try {
          await isUserInCompany(createdBy, companyAssociation);
          await isUserInCompany(createdFor, companyAssociation);
        } catch {
          return Promise.reject(
            Error(
              "The ticket creator you selected does not belong to the company you selected"
            )
          );
        }
        break;
      case 3:
        if (issueType && !issueTypes.find(item => item.id === issueType))
          return Promise.reject(Error("Please select a valid issue type"));
        break;
      case 4:
        if (!category || !categories.find(item => item.id === category))
          return Promise.reject(Error("Please select a valid category"));
        break;
      case 5:
        const gluuServerProduct = gluuProducts.find(item => item.id === 1);
        if (
          !gluuServerProduct ||
          !gluuServerProduct.version.includes(gluuServer)
        )
          return Promise.reject(
            Error("Please select a valid Gluu server version")
          );
        break;
      case 6:
        const osValues = Object.values(TicketOs) as Array<string>;
        if (!os || !osValues.includes(os))
          return Promise.reject(Error("Please select a valid OS"));
        if (!osVersion)
          return Promise.reject(Error("Please enter a valid OS version"));
        break;
      case 7:
        break;
      case 8:
        for (let i = 0; i < products.length; i++) {
          const product = products[i];
          const gluuProduct = gluuProducts.find(item => item.id === product.id);
          if (!gluuProduct)
            return Promise.reject(
              Error(
                `Please select a valid Gluu product for additional product ${i}`
              )
            );
          if (!gluuProduct.os.includes(product.os))
            return Promise.reject(
              Error(`Please select a valid OS for additional product ${i}`)
            );
          if (!gluuProduct.version.includes(product.version))
            return Promise.reject(
              Error(`Please select a valid version for additional product ${i}`)
            );
          if (!product.osVersion)
            return Promise.reject(
              Error(
                `Please select a valid OS version for additional product ${i}`
              )
            );
        }
        break;
      case 9:
        if (title.length < 2)
          return Promise.reject(
            Error(
              "Please ensure your ticket title is more than 2 characters long"
            )
          );
        if (title.length < 2)
          return Promise.reject(
            Error(
              "Please ensure your ticket body is more than 2 characters long"
            )
          );
        break;
      default:
        break;
    }

    return Promise.resolve("");
  };

  return validateStep;
};

export default useValidators;
