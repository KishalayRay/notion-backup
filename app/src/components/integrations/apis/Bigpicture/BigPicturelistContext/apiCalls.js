import axios from "axios";
import {
  getBigPictureStart,
  getBigPictureFailure,
  getBigPictureSuccess,
  deleteBigPictureStart,
  deleteBigPictureFailure,
  deleteBigPictureSuccess,
  createBigPictureStart,
  createBigPictureSuccess,
  createBigPictureFailure,
} from "./listActions";
export const GetCompanies = async (axiosPrivate, dispatch) => {
  dispatch(getBigPictureStart);
  try {
    const response = await axiosPrivate.get(`/bigpicture/companies`);

    dispatch(getBigPictureSuccess(response.data.data.company));
    console.log(response.data.data.company);
  } catch (e) {
    dispatch(getBigPictureFailure);
  }
};
export const CreateCompany = async (domain, axiosPrivate, dispatch) => {
  dispatch(createBigPictureStart);
  console.log(domain);
  try {
    const res = await axiosPrivate.post(`/apiconfig/key`, {
      apiSlug: "Bigpicture",
    });
    const apiKey = res.data.data.ApiKey.keys[0].key;

    const response = await axios.get(
      `https://company.bigpicture.io/v1/companies/find/stream?domain=${domain}`,
      {
        headers: {
          Authorization: apiKey,
        },
      }
    );
    const company = response.data;
    console.log(company);
    const companyObject = {
      company: company.legalName,
      sector: company.tags[0],
      site: company.url,
    };

    const postData = await axiosPrivate.post(`/bigpicture/newcompany`, {
      companyId: company.id,
      company: company.legalName,
      sector: company.tags,
      site: company.url,
      location: company.location,
      foundedYear: company.foundedYear,
      description: company.description,
      valuation: company.metrics.marketCap,
      raised: company.metrics.raised,
      employees: company.metrics.employees,
      revenue: company.metrics.annualRevenue,
      rank: company.metrics.alexaGlobalRank,
      followers: company.twitter.followers,
      aliases: company.aliases,
    });
    console.log(postData.data);
    console.log(companyObject);
    dispatch(createBigPictureSuccess(companyObject));
  } catch (e) {
    console.log(e);
    dispatch(createBigPictureFailure);
  }
};

export const DeleteCompany = async (id, axiosPrivate, dispatch) => {
  dispatch(deleteBigPictureStart);

  try {
    await axiosPrivate.put(`/bigpicture/${id}`, {});

    dispatch(deleteBigPictureSuccess(id));
  } catch (e) {
    console.log(e);
    dispatch(deleteBigPictureFailure);
  }
};
