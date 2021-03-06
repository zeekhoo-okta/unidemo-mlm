import axios from 'axios';
import oktaAuthConfig from '@/.config.js'

export default {
	getWellKnownConfigs(subdomain) {
		if (!oktaAuthConfig.udp_api)
			return false;

        const path = oktaAuthConfig.udp_api + '/api/configs/' + subdomain  + '/bod';
		return axios.get(path)
		.then((res) => {
			var result = {
				issuer: '',
				base_url: '',
				client_id: '',
				redirect_uri: '',
				fbId: '',
				prospect_group_id: '',
				customer_group_id: ''
			};
            const data = res.data;
			if (Object.keys(data).length > 0) {
				result.issuer=data.issuer;
				result.base_url=data.okta_org_name;
				result.client_id=data.client_id;
				result.redirect_uri=data.redirect_uri;
				result.fbId=data.settings.fbId;
				result.prospect_group_id=data.settings.prospect_group_id;
				result.customer_group_id=data.settings.customer_group_id;
			}
			return result;
		})
		.catch(err => {
			// could not read the config from UDP. 
			return false;
		});
	}
}

