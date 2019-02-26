// Create the namespace instance
let ns = {};

// Create the model instance
ns.model = (function() {
    'use strict';

    let $event_pump = $('body');

    // Return the API
    return {
        'read': function() {
            let ajax_options = {
                type: 'GET',
                url: 'api/pacientes',
                accepts: 'application/json',
                dataType: 'json'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_read_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        create: function(nome, cpf, rg, dtnascto, email, cep, endereco, bairro, cidade, estado, convenio) {
            let ajax_options = {
                type: 'POST',
                url: 'api/pacientes',
                accepts: 'application/json',
                contentType: 'application/json',
                //dataType: 'json',
                data: JSON.stringify({
                    'nome': nome,
                    'cpf': cpf,
                    'rg': rg,
                    'dtnascto': dtnascto,
                    'email': email,
                    'cep': cep,
                    'endereco': endereco,
                    'bairro': bairro,
                    'cidade': cidade,
                    'estado': estado,
                    'convenio': convenio
                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_create_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        update: function(nome, cpf, rg, dtnascto, email, cep, endereco, bairro, cidade, estado, convenio) {
            let ajax_options = {
                type: 'PUT',
                url: 'api/pacientes/' + cpf,
                accepts: 'application/json',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                    'nome': nome,
                    'cpf': cpf,
                    'rg': rg,
                    'dtnascto': dtnascto,
                    'email': email,
                    'cep': cep,
                    'endereco': endereco,
                    'bairro': bairro,
                    'cidade': cidade,
                    'estado': estado,
                    'convenio': convenio
                })
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_update_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        },
        'delete': function(cpf) {
            let ajax_options = {
                type: 'DELETE',
                url: 'api/pacientes/' + cpf,
                accepts: 'application/json',
                contentType: 'plain/text'
            };
            $.ajax(ajax_options)
            .done(function(data) {
                $event_pump.trigger('model_delete_success', [data]);
            })
            .fail(function(xhr, textStatus, errorThrown) {
                $event_pump.trigger('model_error', [xhr, textStatus, errorThrown]);
            })
        }
    };
}());

// Create the view instance
ns.view = (function() {
    'use strict';

     let $nome = $('#nome'),
		 $cpf = $('#cpf'),
		 $rg = $('#rg'),
         $dtnascto = $('#dtnascto'),
		 $email = $('#email'),
		 $cep = $('#cep'),
         $endereco = $('#endereco'),
		 $bairro = $('#bairro'),
		 $cidade = $('#cidade'),
		 $estado = $('#estado'),
         $convenio = $('#convenio');

    // return the API
    return {
        reset: function() {
            $cpf.val('');
            $nome.val('').focus();
	    $rg.val('');
            $dtnascto.val('');
	    $email.val('');
	    $cep.val('');
            $endereco.val('');
	    $bairro.val('');
	    $cidade.val('');
	    $estado.val('');
            $convenio.val('');
        },
        update_editor: function(nome, cpf, rg, dtnascto, email, cep, endereco, bairro, cidade, estado, convenio) {
            $cpf.val(cpf);
            $nome.val(nome).focus();
	    $rg.val(rg);
            $dtnascto.val(dtnascto);
	    $email.val(email);
	    $cep.val(cep);
            $endereco.val(endereco);
	    $bairro.val(bairro);
	    $cidade.val(cidade);
	    $estado.val(estado);
            $convenio.val(convenio);
        },
        build_table: function(people) {
            let rows = ''

            // clear the table
            $('.pacientes table > tbody').empty();

            // did we get a people array?
            if (people) {
                for (let i=0, l=people.length; i < l; i++) {
                    rows += `<tr><td class="nome">${people[i].nome}</td><td class="cpf">${people[i].cpf}</td><td class="rg">${people[i].rg}</td><td class="dtnascto">${people[i].dtnascto}</td><td class="email">${people[i].email}</td><td class="cep">${people[i].cep}</td><td class="endereco">${people[i].endereco}</td><td class="bairro">${people[i].bairro}</td><td class="cidade">${people[i].cidade}</td><td class="estado">${people[i].estado}</td><td class="convenio">${people[i].convenio}</td><td>${people[i].dataatualizacao}</td></tr>`;
                }
                $('table > tbody').append(rows);
            }
        },
        error: function(error_msg) {
            $('.error')
                .text(error_msg)
                .css('visibility', 'visible');
            setTimeout(function() {
                $('.error').css('visibility', 'hidden');
            }, 3000)
        }
    };
}());

// Create the controller
ns.controller = (function(m, v) {
    'use strict';

    let model = m,
        view = v,
        $event_pump = $('body'),
        $nome = $('#nome'),
	    $cpf = $('#cpf'),
		$rg = $('#rg'),
        $dtnascto = $('#dtnascto'),
		$email = $('#email'),
		$cep = $('#cep'),
        $endereco = $('#endereco'),
		$bairro = $('#bairro'),
		$cidade = $('#cidade'),
		$estado = $('#estado'),
        $convenio = $('#convenio');

    // Get the data from the model after the controller is done initializing
    setTimeout(function() {
        model.read();
    }, 100)

    // Validate input
    function validate(nome, cpf, rg, dtnascto, email, cep, endereco, bairro, cidade, estado, convenio) {
        return nome !== "" && cpf !== "" && rg !== "" && dtnascto !== "" && email !== "" && cep !== "" && endereco !== "" && bairro !== "" && cidade !== "" && estado !== "" && convenio !== "";
    }

    // Create our event handlers
    $('#create').click(function(e) {
        let nome = $nome.val(),
            cpf = $cpf.val(),
	    rg = $rg.val(),
            dtnascto = $dtnascto.val(),
	    email = $email.val(),
	    cep = $cep.val(),
            endereco = $endereco.val(),
	    bairro = $bairro.val(),
	    cidade = $cidade.val(),
	    estado = $estado.val(),
            convenio = $convenio.val();

        e.preventDefault();

        if (validate(nome, cpf, rg, dtnascto, email, cep, endereco, bairro, cidade, estado, convenio)) {
            model.create(nome, cpf, rg, dtnascto, email, cep, endereco, bairro, cidade, estado, convenio)
        } else {
            alert('Problema com as informacoes do paciente');
        }
    });

    $('#update').click(function(e) {
        let nome = $nome.val(),
            cpf = $cpf.val(),
	    rg = $rg.val(),
            dtnascto = $dtnascto.val(),
	    email = $email.val(),
	    cep = $cep.val(),
            endereco = $endereco.val(),
	    bairro = $bairro.val(),
	    cidade = $cidade.val(),
	    estado = $estado.val(),
            convenio = $convenio.val();

        e.preventDefault();

        if (validate(nome, cpf, rg, dtnascto, email, cep, endereco, bairro, cidade, estado, convenio)) {
            model.update(nome, cpf, rg, dtnascto, email, cep, endereco, bairro, cidade, estado, convenio)
        } else {
            alert('Problemas com as informacoes do paciente');
        }
        e.preventDefault();
    });

    $('#delete').click(function(e) {
        let cpf = $cpf.val();

        e.preventDefault();

        if (validate('placeholder', cpf)) {
            model.delete(cpf)
        } else {
            alert('Problemas com as informacoes do paciente');
        }
        e.preventDefault();
    });

    $('#reset').click(function() {
        //location.reload();
        //model.read();
        window.location.reload();
        view.reset();
    })

    $('table > tbody').on('dblclick', 'tr', function(e) {
        let $target = $(e.target),
            nome,
            cpf,
            rg,
            dtnascto,
            email,
            cep,
            endereco,
            bairro,
            cidade,
            estado,
            convenio;

        nome = $target
            .parent()
            .find('td.nome')
            .text();

        cpf = $target
            .parent()
            .find('td.cpf')
            .text();

        rg = $target
            .parent()
            .find('td.rg')
            .text();

        dtnascto = $target
            .parent()
            .find('td.dtnascto')
            .text();

        email = $target
            .parent()
            .find('td.email')
            .text();

        cep = $target
            .parent()
            .find('td.cep')
            .text();

        endereco = $target
            .parent()
            .find('td.endereco')
            .text();

        bairro = $target
            .parent()
            .find('td.bairro')
            .text();

        cidade = $target
            .parent()
            .find('td.cidade')
            .text();

        estado = $target
			.parent()
			.find('td.estado')
            .text();

        convenio = $target
			.parent()
			.find('td.convenio')
            .text();

        view.update_editor(nome, cpf, rg, dtnascto, email, cep, endereco, bairro, cidade, estado, convenio);
    });

    // Handle the model events
    $event_pump.on('model_read_success', function(e, data) {
        view.build_table(data);
        view.reset();
    });

    $event_pump.on('model_create_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_update_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_delete_success', function(e, data) {
        model.read();
    });

    $event_pump.on('model_error', function(e, xhr, textStatus, errorThrown) {
        let error_msg = "Msg de Erro:" + textStatus + ': ' + errorThrown + ' - ' + xhr.responseJSON.detail;
        view.error(error_msg);
        console.log(error_msg);
    })
}(ns.model, ns.view));

