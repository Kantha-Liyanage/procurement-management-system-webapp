export class SiteView{
    static getSiteHTML(json:any) : string{
        return `
            <table class="table table-bordered table-sm">
                <tbody>
                    <tr>
                        <td colspan=2><b><center>Address</center></b></td>
                    </tr>
                    <tr>
                        <td><b>Line 1</b></td>
                        <td>${json.address.addressLine1}</td>
                    </tr>
                    <tr>
                        <td><b>Line 2</b></td>
                        <td>${json.address.addressLine2}</td>
                    </tr>
                    <tr>
                        <td><b>City</b></td>
                        <td>${json.address.city}</td>
                    </tr>
                    <tr>
                        <td><b>Province</b></td>
                        <td>${json.address.province}</td>
                    </tr>
                    <tr>
                        <td><b>State</b></td>
                        <td>${json.address.state}</td>
                    </tr>
                    <tr>
                        <td><b>Country</b></td>
                        <td>${json.address.countryName}</td>
                    </tr>
                    
                    <tr>
                    <td colspan=2><b><center>Contact Details</center></b></td>
                    </tr>
                    <tr>
                        <td><b>Line 1</b></td>
                        <td>${json.contact.personName}</td>
                    </tr>
                    <tr>
                        <td><b>Telephone 1</b></td>
                        <td>${json.contact.telephone1}</td>
                    </tr>
                    <tr>
                        <td><b>Telephone 2</b></td>
                        <td>${json.contact.telephone2}</td>
                    </tr>
                    <tr>
                        <td><b>Telephone 3</b></td>
                        <td>${json.contact.telephone3}</td>
                    </tr>
                    <tr>
                        <td><b>Fax</b></td>
                        <td>${json.contact.fax}</td>
                    </tr>
                    <tr>
                        <td><b>Email</b></td>
                        <td>${json.contact.email}</td>
                    </tr>
                </tbody>
            </table>
        `;
    }
}